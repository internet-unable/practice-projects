<?php

namespace App\Command;

use App\Entity\Comment;
use App\Entity\CommentType;
use App\Entity\Institution\InstitutionUnit;
use App\Entity\Institution\InstitutionUnitDepartment;
use App\Repository\CommentRepository;
use App\Repository\Institution\InstitutionUnitDepartmentRepository;
use App\Repository\Institution\InstitutionUnitRepository;
use Doctrine\ORM\EntityManagerInterface;
use libphonenumber\NumberParseException;
use libphonenumber\PhoneNumberUtil;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Helper\ProgressBar;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'app:comments-import',
    description: 'Import comments from old db',
)]
class CommentsImportCommand extends Command
{
    public function __construct(
        protected readonly InstitutionUnitRepository $unitRepository,
        protected readonly InstitutionUnitDepartmentRepository $departmentRepository,
        protected readonly CommentRepository $commentRepo,
        protected readonly PhoneNumberUtil $phoneNumberUtil,
        protected EntityManagerInterface $em,
    )
    {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $total = 0;
        $addComments = 0;
        $unitNotFound = 0;
        $depNotFound = 0;
        $parentNotFound = 0;

        $io = new SymfonyStyle($input, $output);
        $conn = $this->em->getConnection();

        $conn->prepare('TRUNCATE TABLE comments')->executeQuery();

        $sql = "SELECT * FROM micto_old.comment ORDER BY parent_id_comment ASC, created ASC";
        $res = $conn->prepare($sql)->executeQuery()->fetchAllAssociative();

        $progressBar = new ProgressBar($output, count($res));
        $progressBar->start();

        foreach ($res as $row) {
            $total++;

            $entity = $this->findEntity($row);

            if (!$entity) {
                'offer' == $row['type_comment'] ? $depNotFound++ : $unitNotFound++;
                continue;
            }

            try {
                $comment = $this->createComment($row, $entity);
            } catch (\Exception) {
                $parentNotFound++;

                continue;
            }

            try {
                $this->commentRepo->save($comment);
                $this->em->clear();

                $addComments++;
            } catch (\Exception $e) {
                $io->error($e->getMessage());
            }

            $progressBar->advance();
        }

        $io->info("Total: $total");
        $io->info("New comments: $addComments");
        $io->info("Unit not found: $unitNotFound");
        $io->info("Department not found: $depNotFound");
        $io->info("Parent comment not found: $parentNotFound");

        return Command::SUCCESS;
    }

    private function findEntity($row): InstitutionUnit|InstitutionUnitDepartment|null
    {
        return 'offer' == $row['type_comment']
            ? $this->departmentRepository->findOneBy(['oldId' => $row['id_article']])
            : $this->unitRepository->findOneBy(['oldId' => $row['id_article']]);
    }

    private function createComment($row, $entity)
    {
        $comment = new Comment();
        $comment->setEntity($entity);

        if ($row['parent_id_comment']) {
            $comment->setType(CommentType::REPLY);
            $parentComment = $this->commentRepo->findOneBy(['oldId' => $row['parent_id_comment']]);

            if ($parentComment) {
                $comment->setParentItem($parentComment);
                $comment->setRootItem($parentComment->getRootItem() ?: $parentComment);
            } else {
                throw new \Exception("Parent not found.");
            }
        } else {
            $comment->setType($row['question'] ? CommentType::QUESTION : CommentType::REVIEW);
        }

        if (CommentType::REVIEW == $comment->getType()) {
            $comment->setMark($row['assessment'] ?? 1);
        }

        $commentDate = new \DateTime();
        $commentDate->setTimestamp($row['created']);


        $comment->setCreatedAt($commentDate);
        $comment->setUpdatedAt($commentDate);
        $comment->setNumLikes($row['likes']);
        $comment->setNumDislikes($row['dislikes']);
        $comment->setIsPublished(1 == $row['status']);
        $comment->setIsNotificationSent(1 == $row['status']);
        $comment->setText($row['content']);
        $comment->setName($row['author'] ?? 'Анонім');
        $comment->setEmail(filter_var($row['email'], FILTER_VALIDATE_EMAIL) ? $row['email'] : null);

        if (!empty($row['phone']) && $this->validate($row['phone'])) {
            $comment->setPhone($row['phone']);
        }

        $comment->setOldId($row['id']);

        return $comment;
    }

    public function validate($phoneNumber)
    {
        try {
            $numberProto = $this->phoneNumberUtil->parse($phoneNumber);

            return $this->phoneNumberUtil->isValidNumber($numberProto);
        } catch (NumberParseException $e) {
            return false;
        }
    }
}

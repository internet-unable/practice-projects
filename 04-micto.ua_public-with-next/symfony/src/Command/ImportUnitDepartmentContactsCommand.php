<?php

namespace App\Command;

use App\Entity\Institution\InstitutionUnitDepartment;
use App\Repository\Institution\InstitutionUnitDepartmentRepository;
use App\Service\PhoneFormatter;
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
    name: 'app:unit-department-contacts-import',
    description: 'Import institution unit department contacts from old db',
)]
class ImportUnitDepartmentContactsCommand extends Command
{
    public function __construct(
        protected readonly InstitutionUnitDepartmentRepository $unitDepartmentRepo,
        protected readonly PhoneNumberUtil $phoneNumberUtil,
        protected readonly PhoneFormatter $phoneFormatter,
        protected readonly EntityManagerInterface $em,
    )
    {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $conn = $this->em->getConnection();

        $sql = "SELECT * FROM micto_old.products_offers";

        $res = $conn->prepare($sql)->executeQuery()->fetchAllAssociative();

        $progressBar = new ProgressBar($output);

        foreach ($progressBar->iterate($res) as $i => $row) {
            if ($i % 50 === 0) {
                $this->em->clear();
            }

            $data = @unserialize($row['data']);

            if (empty($data['phone']) || '-' == trim($data['phone'])) {
                continue;
            }

            /** @var InstitutionUnitDepartment|null $department */
            $department = $this->unitDepartmentRepo->findOneBy(['oldId' => $row['offer_id']]);

            if (!$department) {
                continue;
            }

            $comment = trim($data['phone_type']);
            $comment = trim($comment, '-');

            $phones = [];

            if ($this->validate($data['phone'])) {
                $phones[] = [
                    'number' => $this->phoneFormatter->getClearPhoneNumber($data['phone']),
                    'comment' => $comment,
                ];
            } else {
                if (preg_match('/^\d{6}$/', $data['phone'])) {
                    $data['phone'] = preg_replace('/(\d{2})(\d{2})(\d{2})/', '$1-$2-$3', $data['phone']);
                } elseif (9 == $data['phone'] && str_starts_with($data['phone'], '09')) {
                    continue;
                }

                $phones[] = [
                    'number' => $data['phone'],
                    'comment' => $comment,
                ];
            }

            try {
                $department->setContacts([
                    'phones' => $phones,
                ]);

                $this->em->persist($department);
                $this->em->flush();
            } catch (\Exception $e) {
                $io->error($e->getMessage());
            }
        }

        $progressBar->finish();

        return Command::SUCCESS;
    }

    private function validate($phoneNumber)
    {
        try {
            $numberProto = $this->phoneNumberUtil->parse($phoneNumber, 'UA');

            return $this->phoneNumberUtil->isValidNumber($numberProto);
        } catch (NumberParseException $e) {
            return false;
        }
    }
}

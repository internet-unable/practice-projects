<?php

namespace App\Command;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'app:update-institution-rating',
    description: 'Set rating for institutions, units and departments',
)]
class UpdateInstitutionRatingCommand extends Command
{
    public function __construct(
        protected readonly EntityManagerInterface $em
    )
    {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $io->text(sprintf(
            '[%s] Set rating for %d departments',
            (new \DateTime())->format('Y-m-d H:i:s'),
            $this->updateRating('institution_unit_departments', 'institution_unit_department_id')
        ));

        $io->text(sprintf(
            '[%s] Set rating for %d units',
            (new \DateTime())->format('Y-m-d H:i:s'),
            $this->updateRating('institution_units', 'institution_unit_id')
        ));

        $io->text(sprintf(
            '[%s] Set rating for %d institutions',
            (new \DateTime())->format('Y-m-d H:i:s'),
            $this->updateRating('institutions', 'institution_id')
        ));

        return Command::SUCCESS;
    }

    protected function updateRating(string $table, string $joinColumn): int
    {
        $conn = $this->em->getConnection();

        $sql = sprintf("SELECT DISTINCT t.id FROM %s t
            INNER JOIN comments c ON (t.id = c.%s)
            WHERE c.mark IS NOT NULL 
              AND c.mark > 0
              AND c.is_published = 1
              AND (t.rating_updated_at IS NULL OR c.updated_at > t.rating_updated_at)
        ", $table, $joinColumn);

        $res = $conn->prepare($sql)->executeQuery()->fetchAllAssociative();

        $numRecords = count($res);

        $res = array_chunk(array_column($res, 'id'), 100);

        foreach ($res as $ids) {
            $sql = sprintf("UPDATE %s t
                SET t.rating = (
                    SELECT ROUND(AVG(c.mark), 1)
                    FROM comments c
                    WHERE c.%s = t.id 
                      AND c.mark IS NOT NULL
                      AND c.mark > 0
                      AND c.is_published = 1
                    GROUP BY c.%s
                ), t.rating_updated_at = '%s'
                WHERE t.id IN (%s)",
                $table,
                $joinColumn,
                $joinColumn,
                (new \DateTime())->format('Y-m-d H:i:s'),
                implode(',', $ids)
            );
            $conn->prepare($sql)->executeQuery();
        }

        return $numRecords;
    }
}

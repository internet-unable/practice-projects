<?php

namespace App\Command;

use App\Entity\CityDistrict;
use App\Entity\Institution\Institution;
use App\Repository\CityDistrictRepository;
use App\Repository\CityRepository;
use App\Repository\Institution\InstitutionRepository;
use App\Repository\Institution\InstitutionUnitTypeRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Helper\ProgressBar;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\String\Slugger\AsciiSlugger;

#[AsCommand(
    name: 'app:institution-has-several-units',
    description: 'Mark institution with several units',
)]
class SetInstitutionHasSeveralUnitsCommand extends Command
{
    public function __construct(
        protected readonly EntityManagerInterface $em
    )
    {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $conn = $this->em->getConnection();

        $sql = "UPDATE institutions i 
            SET has_several_units = (
                SELECT IF(COUNT(iu.id) > 1, 1, 0) 
                FROM institution_units iu 
                WHERE iu.institution_id = i.id AND iu.is_published = 1
            )";

        $conn->prepare($sql)->executeQuery();


        return Command::SUCCESS;
    }
}

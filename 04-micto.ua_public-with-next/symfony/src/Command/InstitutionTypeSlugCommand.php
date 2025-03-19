<?php

namespace App\Command;

use App\Entity\Traits\EncodingTrait;
use App\Repository\Institution\InstitutionUnitTypeRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\String\Slugger\AsciiSlugger;

#[AsCommand(
    name: 'app:institution-type-slug',
    description: 'Generate slug for institution types',
)]
class InstitutionTypeSlugCommand extends Command
{
    use EncodingTrait;

    public function __construct(
        protected readonly InstitutionUnitTypeRepository $typeRepository,
        protected readonly EntityManagerInterface $em
    )
    {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $slugger = new AsciiSlugger();

        foreach ($this->typeRepository->findAll() as $type) {
//            $slug = $slugger->slug($type->getName(), '-', 'ua')->lower();
//            $slug->length();
//            $type->setSlug($slug->toString());
            $type->setSlug($this->encoding($type->getName()));

            $this->em->persist($type);
            $this->em->flush();
        }

        return Command::SUCCESS;
    }
}

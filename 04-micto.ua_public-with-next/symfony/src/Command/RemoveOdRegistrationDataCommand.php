<?php

namespace App\Command;

use App\Repository\MultiStepRegistrationRepository;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'app:clear-old-registrations',
    description: 'Remove old registrations data',
)]
class RemoveOdRegistrationDataCommand extends Command
{
    public function __construct(
        protected readonly MultiStepRegistrationRepository $registrationRepo,
    )
    {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $numDeleted = $this->registrationRepo->removeOldData();

        if ($numDeleted) {
            $io->text(sprintf(
                '[%s] Removed old registration data: %d',
                (new \DateTime())->format('Y-m-d H:i:s'),
                $numDeleted
            ));
        }

        return Command::SUCCESS;
    }
}

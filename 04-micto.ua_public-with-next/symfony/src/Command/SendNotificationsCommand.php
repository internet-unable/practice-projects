<?php

namespace App\Command;

use App\Repository\Notification\NotificationRepository;
use App\Service\Notification\NotificationService;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'app:send-notifications',
    description: 'Set notifications to users',
)]
class SendNotificationsCommand extends Command
{
    private ?SymfonyStyle $io;

    public function __construct(
        protected readonly NotificationService $notificationService,
        protected readonly NotificationRepository $notificationRepo,
    )
    {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $this->io = new SymfonyStyle($input, $output);

        $this->removeOldNotifications();

        $numNotifications = 0;
        $numGenerated = 0;

        foreach ($this->notificationRepo->getNotSentNotifications() as $notification) {
            $numNotifications ++;
            $numGenerated += $this->notificationService->generateUserNotifications($notification);
        }

        if ($numNotifications) {
            $this->log(sprintf('Checked notifications: %d', $numNotifications));
            $this->log(sprintf('Sent notifications to users: %d', $numGenerated));
        }

        return Command::SUCCESS;
    }

    protected function removeOldNotifications()
    {
        $numDeleted = $this->notificationService->removeOldNotifications();

        if ($numDeleted) {
            $this->log(sprintf('Removed old notifications: %d', $numDeleted));
        }
    }

    protected function log(string $message): void
    {
        if ($this->io) {
            $date = (new \DateTime())->format('Y-m-d H:i:s');
            $this->io->writeln(sprintf('[%s] %s', $date, $message));
        }
    }
}

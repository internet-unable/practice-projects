<?php

namespace App\Service\Notification;

use App\Entity\Comment;
use App\Entity\CommentType;
use App\Entity\Notification\Notification;
use App\Entity\Notification\NotificationType;
use App\Entity\Notification\UserNotification;
use App\Repository\CommentRepository;
use App\Repository\Notification\NotificationRepository;
use App\Repository\Notification\UserNotificationRepository;
use App\Repository\UserPermissionRepository;

class NotificationService
{
    private const SAVE_NOTIFICATIONS_DAYS = 364;

    public function __construct(
        private readonly NotificationRepository $notificationRepo,
        private readonly UserNotificationRepository $userNotificationRepo,
        private readonly CommentRepository $commentRepo,
        private readonly UserPermissionRepository $userPermissionRepo,
    ){}

    public function dispatchNewCommentNotification(Comment $comment)
    {
        if ($comment->isInstitutionComment()) {
            return;
        }

        $notificationType = $comment->getType() == CommentType::REPLY
            ? NotificationType::COMMENT_REPLY : NotificationType::COMMENT;

        $notification = new Notification();
        $notification
            ->setType($notificationType)
            ->setComment($comment)
            ->setIsSent(false)
        ;

        $this->notificationRepo->save($notification);
    }

    public function removeOldNotifications(): int
    {
        $date = (new \DateTime())->modify(sprintf('-%d days', self::SAVE_NOTIFICATIONS_DAYS));

        return $this->notificationRepo->removeRecordsOlderThan($date);
    }

    /**
     * @param Notification $notification
     *
     * @return int Number of generated user notifications
     */
    public function generateUserNotifications(Notification $notification): int
    {
        // TODO: Implement system notifications
        if (!in_array($notification->getType(), [NotificationType::COMMENT, NotificationType::COMMENT_REPLY])) {
            return 0;
        }

        $users = $this->getUsersForCommentNotification($notification);

        if (empty($users)) {
            $this->notificationRepo->remove($notification);

            return 0;
        }

        foreach ($users as $user) {
            $userNotification = (new UserNotification())
                ->setNotification($notification)
                ->setUser($user)
                ->setCreatedAt($notification->getCreatedAt())
            ;

            $this->userNotificationRepo->save($userNotification);
        }

        $notification->setIsSent(true);
        $this->notificationRepo->save($notification);

        return count($users);
    }

    private function getUsersForCommentNotification(Notification $notification): array
    {
        if (!$comment = $notification->getComment()) {
            return [];
        }

        $users = $this->userPermissionRepo->getUsersWithAccessToEntity(
            $comment->getInstitutionUnitDepartment() ?? $comment->getInstitutionUnit() ?? $comment->getInstitution()
        );

        return array_filter($users, function($user) use ($comment) {
            return $user->getId() != $comment->getUser()?->getId();
        });
    }
}

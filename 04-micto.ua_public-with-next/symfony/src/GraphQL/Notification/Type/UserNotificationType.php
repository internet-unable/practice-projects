<?php

namespace App\GraphQL\Notification\Type;

use App\Entity\Notification\NotificationType;
use App\Entity\Notification\UserNotification;
use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\SourceField;
use TheCodingMachine\GraphQLite\Annotations\Type;

#[Type(class: UserNotification::class, name: 'UserNotification')]
#[SourceField(name: 'id')]
#[SourceField(name: 'isRead')]
class UserNotificationType
{
    #[Field]
    public function getCreationDate(UserNotification $userNotification): string
    {
        return $userNotification->getCreatedAt()->format('Y-m-d H:i:s');
    }

    #[Field]
    public function getNotification(UserNotification $userNotification): ?NotificationInterface
    {
        $notification = $userNotification->getNotification();

        return match ($notification->getType()) {
            NotificationType::COMMENT => (new CommentNotification())->setNotification($notification),
            NotificationType::COMMENT_REPLY => (new CommentReplyNotification())->setNotification($notification),
            NotificationType::SYSTEM => (new SystemNotification())->setNotification($notification),
            default => null,
        };
    }
}

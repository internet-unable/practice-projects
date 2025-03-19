<?php

namespace App\GraphQL\Notification\Type;

use App\Entity\Notification\Notification;

abstract class AbstractNotification implements NotificationInterface
{
    protected readonly Notification $notification;

    public function setNotification(Notification $notification): self
    {
        $this->notification = $notification;

        return $this;
    }

    public function getCreationDate(): string
    {
        return $this->notification->getCreatedAt()->format('Y-m-d H:i:s');
    }
}

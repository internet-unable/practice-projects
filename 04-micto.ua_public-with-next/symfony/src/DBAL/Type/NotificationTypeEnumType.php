<?php

namespace App\DBAL\Type;

use App\Entity\Notification\NotificationType;

class NotificationTypeEnumType extends EnumType
{
    const NAME = 'NotificationTypeEnumType';

    public function getName(): string
    {
        return self::NAME;
    }

    protected function getValues(): array
    {
        return array_map(fn(NotificationType $case) => $case->value, NotificationType::cases());
    }
}

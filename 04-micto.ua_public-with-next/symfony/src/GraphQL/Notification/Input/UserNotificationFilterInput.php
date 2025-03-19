<?php

namespace App\GraphQL\Notification\Input;

use DateTimeInterface;
use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\Input;

#[Input(description: 'Input for filtering user notifications')]
class UserNotificationFilterInput
{
    #[Field(description: "Select only unread notifications")]
    public bool $onlyUnread = false;

    #[Field]
    public ?DateTimeInterface $dateFrom = null;

    #[Field]
    public ?DateTimeInterface $dateTo = null;
}

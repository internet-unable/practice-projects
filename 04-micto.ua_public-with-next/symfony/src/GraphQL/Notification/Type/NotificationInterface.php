<?php

namespace App\GraphQL\Notification\Type;

use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\Type;

#[Type(name: 'NotificationInterface')]
interface NotificationInterface
{
    #[Field]
    public function getCreationDate(): string;
}

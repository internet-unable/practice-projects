<?php

namespace App\GraphQL\Institution\Type;

use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\Type;

#[Type(name: 'OwnershipFormData')]
class OwnershipFormType
{
    #[Field]
    public string $name;

    #[Field]
    public string $title;
}

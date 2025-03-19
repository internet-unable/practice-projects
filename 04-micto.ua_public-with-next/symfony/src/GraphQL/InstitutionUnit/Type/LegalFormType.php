<?php

namespace App\GraphQL\InstitutionUnit\Type;

use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\Type;

#[Type(name: 'LegalForm')]
class LegalFormType
{
    #[Field]
    public string $name;

    #[Field]
    public string $title;
}

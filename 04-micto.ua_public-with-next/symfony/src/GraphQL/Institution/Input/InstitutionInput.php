<?php

namespace App\GraphQL\Institution\Input;

use App\GraphQL\Media\Input\ImageInputTrait;
use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\Input;

#[Input(description: 'Input for Institution edit')]
class InstitutionInput
{
    use ImageInputTrait;

    #[Field(description: 'Institution name')]
    public ?string $name = null;

    #[Field(description: 'Institution full name')]
    public ?string $fullName = null;

    #[Field(description: 'Institution description text')]
    public ?string $description = null;
}

<?php

namespace App\GraphQL\UnitDepartment\Input;

use App\GraphQL\Contacts\Type\ContactsInput;
use App\GraphQL\Media\Input\ImageInputTrait;
use Symfony\Component\Validator\Constraints as Assert;
use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\Input;

#[Input(description: 'Input type for Institution unit department')]
class UnitDepartmentInput
{
    use ImageInputTrait;

    #[Assert\NotBlank]
    #[Assert\Length(min: 3)]
    #[Field(description: 'Unit department name')]
    public string $name;

    #[Field(description: 'Unit department full name')]
    public ?string $fullName = null;

    #[Field(description: 'Unit department description')]
    public ?string $description = null;

    #[Field(description: 'Unit department number')]
    public ?string $number = null;

    #[Field(description: 'Unit department schedule', inputType: '[ScheduleItemInput!]')]
    public ?array $schedule = null;

    #[Assert\Valid]
    #[Field(description: 'Unit department contact information')]
    public ?ContactsInput $contacts = null;
}

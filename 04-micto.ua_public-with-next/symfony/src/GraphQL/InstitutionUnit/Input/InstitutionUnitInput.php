<?php

namespace App\GraphQL\InstitutionUnit\Input;

use App\GraphQL\Address\Input\AddressInput;
use App\GraphQL\Contacts\Type\ContactsInput;
use App\GraphQL\Media\Input\ImageInputTrait;
use Symfony\Component\Validator\Constraints as Assert;
use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\Input;

#[Input(description: 'Input type for Institution unit')]
class InstitutionUnitInput
{
    use ImageInputTrait;

    //#[EntityExists(entityClass: InstitutionType::class)] // TODO: not works
    #[Field(description: 'Institution type ID', inputType: 'Int')]
    public ?int $typeId = null;

    #[Assert\NotBlank]
    #[Assert\Length(min: 3)]
    #[Field(description: 'Institution unit name')]
    public string $name;

    #[Field(description: 'Institution unit full name')]
    public ?string $fullName = null;

    #[Field(description: 'Institution unit description text')]
    public ?string $description = null;

    #[Field(description: 'Institution unit EDRPOU code')]
    public ?string $edrpou = null;

    #[Assert\Valid]
    #[Field(description: 'Institution unit schedule', inputType: '[ScheduleItemInput!]')]
    public ?array $schedule = null;

    #[Assert\Valid]
    #[Assert\NotBlank(groups: ['create'])]
    #[Field(description: 'Institution unit address', inputType: 'AddressInput')]
    public ?AddressInput $address = null;

    #[Assert\Valid]
    #[Field(description: 'Institution unit contact information')]
    public ?ContactsInput $contacts = null;
}

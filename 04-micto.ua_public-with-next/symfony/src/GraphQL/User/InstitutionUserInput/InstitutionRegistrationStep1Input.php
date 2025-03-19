<?php

namespace App\GraphQL\User\InstitutionUserInput;

use App\Entity\Institution\OwnershipForm;
use Symfony\Component\Validator\Constraints as Assert;
use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\Input;

#[Input(description: 'Input type with institution data for register institution user')]
class InstitutionRegistrationStep1Input
{
    #[Assert\NotBlank(normalizer: 'trim')]
    #[Assert\Length(
        min: 2,
        max: 255,
        minMessage: 'Значення занадто коротке. Введіть більше {{ limit }} символів',
        maxMessage: 'Значення занадто довге. Введіть менше {{ limit }} символів'
    )]
    #[Field(description: "Institution name")]
    public string $fullName;

    #[Assert\NotBlank(message: 'Оберіть один з типів')]
    #[Field(description: "Ownership form type")]
    public OwnershipForm $ownershipForm;

    #[Assert\NotBlank(message: 'ОВкажіть код медзакладу')]
    #[Assert\Length(
        min: 8,
        max: 8,
        exactMessage: 'Значення повинно бути рівно 8 символів'
    )]
    #[Assert\Regex(pattern: '/^\d{8}$/', message: 'Код має містити тільки цифри')]
    #[Field(description: "EDRPOU code")]
    public string $edrpou;

    #[Field(description: "Information about institution")]
    public ?string $about = null;

    public function toArray(): array
    {
        return [
            'fullName' => $this->fullName,
            'ownershipForm' => $this->ownershipForm->name,
            'edrpou' => $this->edrpou,
            'about' => $this->about,
        ];
    }
}

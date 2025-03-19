<?php

namespace App\GraphQL\User\InstitutionUserInput;

use App\Validator\Constraints\UniqueUserEmail;
use App\Validator\Constraints\UniqueUserPhone;
use Misd\PhoneNumberBundle\Validator\Constraints\PhoneNumber as AssertPhoneNumber;
use Symfony\Component\Validator\Constraints as Assert;
use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\Input;

#[Input(description: 'Input type with user data for register institution user')]
class InstitutionRegistrationStep2Input
{
    #[Assert\NotBlank(normalizer: 'trim')]
    #[Field(description: "User first name")]
    public string $firstName;

    #[Assert\NotBlank(normalizer: 'trim')]
    #[Field(description: "User last name")]
    public string $lastName;

    #[Assert\NotBlank(normalizer: 'trim')]
    #[AssertPhoneNumber(type: ['fixed_line', 'mobile'])]
    #[UniqueUserPhone(message: 'common.phone_is_in_use')]
    #[Field(description: "User phone number")]
    public string $phone;

    #[Assert\NotBlank(normalizer: 'trim')]
    #[Assert\Email(mode: Assert\Email::VALIDATION_MODE_STRICT)]
    #[UniqueUserEmail(message: 'common.email_is_in_use')]
    #[Field(description: "User email address")]
    public string $email;

    #[Field(description: "User position")]
    public ?string $position;


    public function toArray(): array
    {
        return [
            'firstName' => $this->firstName,
            'lastName' => $this->lastName,
            'phone' => $this->phone,
            'email' => $this->email,
            'position' => $this->position,
        ];
    }
}

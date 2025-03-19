<?php

namespace App\GraphQL\User\Input;

use App\Validator\Constraints\UniqueUserEmail;
use App\Validator\Constraints\UniqueUserPhone;
use Misd\PhoneNumberBundle\Validator\Constraints\PhoneNumber as AssertPhoneNumber;
use Symfony\Component\Validator\Constraints as Assert;
use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\Input;

#[Input(description: 'Input type for register user')]
class RegisterUserInput
{
    #[Assert\NotBlank(normalizer: 'trim')]
    #[Field(description: "User first name")]
    public string $firstName = '';

    #[Assert\NotBlank(normalizer: 'trim')]
    #[Field(description: "User last name")]
    public string $lastName = '';

    #[Assert\NotBlank]
    #[Assert\Email]
    #[UniqueUserEmail(message: 'common.email_is_in_use')]
    #[Field(description: "User email")]
    public string $email;

    #[Field(description: "User phone number")]
    #[AssertPhoneNumber]
    #[UniqueUserPhone(message: 'common.phone_is_in_use')]
    public ?string $phone = null;

    #[Assert\NotBlank]
    #[Field(description: "User password")]
    public string $password;

    #[Assert\NotBlank]
    #[Assert\IdenticalTo(
        propertyPath: 'password',
        message: 'common.incorrect_value'
    )]
    #[Field(description: "Password confirmation")]
    public string $confirmPassword;
}

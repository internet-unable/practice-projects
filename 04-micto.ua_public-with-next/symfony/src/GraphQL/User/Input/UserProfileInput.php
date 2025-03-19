<?php

namespace App\GraphQL\User\Input;

use App\Validator\Constraints\UniqueUserPhone;
use Misd\PhoneNumberBundle\Validator\Constraints\PhoneNumber as AssertPhoneNumber;
use Symfony\Component\Security\Core\Validator\Constraints\UserPassword;
use Symfony\Component\Validator\Constraints as Assert;
use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\Input;

#[Input(description: 'Input type for the user profile')]
class UserProfileInput
{
    #[Assert\NotBlank(normalizer: 'trim')]
    #[Field(description: "User's first name")]
    public string $firstName = '';

    #[Field(description: "User's last name")]
    public ?string $lastName = null;

    #[Field(description: "User's middle name")]
    public ?string $middleName = null;

    #[Field(description: "User's phone number")]
    #[AssertPhoneNumber]
    #[UniqueUserPhone(message: 'common.phone_is_in_use')]
    public ?string $phone = null;

    #[Assert\NotBlank]
    #[UserPassword(message: 'common.incorrect_password')]
    #[Field(description: "User's password")]
    public string $password;
}

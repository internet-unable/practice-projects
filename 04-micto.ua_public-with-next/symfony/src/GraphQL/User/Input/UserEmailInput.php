<?php

namespace App\GraphQL\User\Input;

use App\Validator\Constraints\UniqueUserEmail;
use Symfony\Component\Security\Core\Validator\Constraints\UserPassword;
use Symfony\Component\Validator\Constraints as Assert;
use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\Input;

#[Input(description: 'Input type for the change user email')]
class UserEmailInput
{
    #[Assert\NotBlank]
    #[Assert\Email]
    #[UniqueUserEmail(message: 'common.email_is_in_use')]
    #[Field(description: "New user email")]
    public string $email;

    #[Assert\NotBlank]
    #[UserPassword(message: 'common.incorrect_password')]
    #[Field(description: "User's password")]
    public string $password;
}

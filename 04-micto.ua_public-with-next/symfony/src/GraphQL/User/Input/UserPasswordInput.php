<?php

namespace App\GraphQL\User\Input;

use Symfony\Component\Security\Core\Validator\Constraints\UserPassword;
use Symfony\Component\Validator\Constraints as Assert;
use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\Input;

#[Input(description: 'Input type for the change user password')]
class UserPasswordInput
{
    #[Assert\NotBlank]
    #[Field(description: "New user password")]
    public string $password;

    #[Assert\NotBlank]
    #[Assert\IdenticalTo(
        propertyPath: 'password',
        message: 'common.incorrect_value'
    )]
    #[Field(description: "Password confirmation")]
    public string $confirmPassword;

    #[Assert\NotBlank]
    #[UserPassword(message: 'common.incorrect_password')]
    #[Field(description: "Old user password")]
    public string $oldPassword;
}

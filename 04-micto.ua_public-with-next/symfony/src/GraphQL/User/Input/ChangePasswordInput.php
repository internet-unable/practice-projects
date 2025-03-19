<?php

namespace App\GraphQL\User\Input;

use Symfony\Component\Validator\Constraints as Assert;
use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\Input;

#[Input(description: 'Input type for the change user email')]
class ChangePasswordInput
{
    #[Assert\NotBlank]
    #[Field(description: "The confirmation code that was sent to the user")]
    public string $code;

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
}

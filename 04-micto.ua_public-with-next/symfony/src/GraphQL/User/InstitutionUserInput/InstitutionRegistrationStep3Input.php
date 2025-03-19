<?php

namespace App\GraphQL\User\InstitutionUserInput;

use Symfony\Component\Validator\Constraints as Assert;
use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\Input;

#[Input(description: 'Input type with user password data for register institution user')]
class InstitutionRegistrationStep3Input
{
    #[Assert\NotBlank]
    #[Assert\Length(
        min: 6,
        max: 32,
        minMessage: 'Значення занадто коротке. Введіть {{ limit }} або більше символів',
        maxMessage: 'Значення занадто довге. Введіть менше {{ limit }} символів',
    )]
    #[Field(description: "User password")]
    public string $password;

    #[Assert\NotBlank]
    #[Assert\IdenticalTo(
        propertyPath: 'password',
        message: 'common.incorrect_value'
    )]
    #[Field(description: "Password confirmation")]
    public string $confirmPassword;

    #[Assert\IsTrue(message: 'register.agree_terms_are_require')]
    #[Field(description: "Confirmation that the user agrees to provide personal data")]
    public bool $agreeTerms;

    public function toArray(): array
    {
        return [
            'password' => $this->password,
            'agreeTerms' => $this->agreeTerms,
        ];
    }
}

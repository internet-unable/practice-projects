<?php

namespace App\GraphQL\Psychologist\Input;

use App\Validator\Constraints\RecaptchaTrue;
use Misd\PhoneNumberBundle\Validator\Constraints\PhoneNumber as AssertPhoneNumber;
use Symfony\Component\Validator\Constraints as Assert;
use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\Input;

#[Input(description: 'Input type for psychologist request')]
class PsychologistRequestInput
{
    #[Assert\NotBlank(normalizer: 'trim')]
    #[Assert\Length(
        min: 2,
        max: 255,
        minMessage: 'Значення занадто коротке. Введіть більше {{ limit }} символів',
        maxMessage: 'Значення занадто довге. Введіть менше {{ limit }} символів',
    )]
    #[Field(description: "User name")]
    public string $name = '';

    #[Assert\NotBlank(normalizer: 'trim')]
    #[AssertPhoneNumber(type: ['fixed_line', 'mobile'])]
    #[Field(description: "User phone number")]
    public string $phone = '';

    #[Assert\NotBlank(normalizer: 'trim')]
    #[Field(description: "Comment")]
    public string $comment;

    #[RecaptchaTrue]
    #[Field(description: "Recaptcha code")]
    public string $recaptcha;
}

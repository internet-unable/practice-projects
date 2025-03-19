<?php

namespace App\GraphQL\Common\Validator;

use Symfony\Component\Validator\Constraints\GroupSequence;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use TheCodingMachine\GraphQLite\Validator\ValidationFailedException;

class InputValidator
{
    public function __construct(
        private readonly ValidatorInterface $validator
    ) {}

    public function validate(object $input, string|GroupSequence|array|null $groups = null): void
    {
        $errors = $this->validator->validate($input, groups: $groups);

        ValidationFailedException::throwException($errors);
    }
}

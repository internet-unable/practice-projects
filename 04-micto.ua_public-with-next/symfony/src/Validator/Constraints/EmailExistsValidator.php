<?php

namespace App\Validator\Constraints;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use SoftUa\UserBundle\Repository\UserRepository;
use Symfony\Component\Validator\Exception\UnexpectedValueException;

class EmailExistsValidator extends ConstraintValidator
{
    public function __construct(
        private readonly UserRepository $userRepository,
    ) {}

    public function validate(mixed $value, Constraint $constraint): void
    {
        /* @var EmailExists $constraint */

        if (null === $value || '' === $value) {
            return;
        }

        $user = $this->userRepository->getByLogin($value);

        if ($user) {
            return;
        }

        $this->context->buildViolation($constraint->message)
            ->setParameter('{{ value }}', $value)
            ->addViolation();
    }
}

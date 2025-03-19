<?php

namespace App\Validator\Constraints;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedValueException;

class NotFutureMonthValidator extends ConstraintValidator
{
    public function validate(mixed $value, Constraint $constraint): void
    {
        /* @var NotFutureMonth $constraint */

        if (null === $value || '' === $value) {
            return;
        }

        $now = new \DateTime();
        $currentYear = $now->format('Y');
        $currentMonth = $now->format('m');

        $form = $this->context->getRoot();

        $inputYear = $form->get('yearOfVisit')->getData();
        $inputMonth = $value;

        if ($inputYear === null) {
            return;
        }

        if ($inputYear < $currentYear || ($inputYear == $currentYear && $inputMonth <= $currentMonth)) {
            return;
        }

        $this->context->buildViolation($constraint->message)
            ->addViolation();
    }
}

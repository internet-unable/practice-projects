<?php

namespace App\Validator\Constraints;

use App\Service\ClientIpService;
use ReCaptcha\ReCaptcha;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class RecaptchaTrueValidator extends ConstraintValidator
{
    public function __construct(
        private readonly ReCaptcha $recaptcha,
        private readonly ClientIpService $ipService,
    ) {}

    public function validate(mixed $value, Constraint $constraint): void
    {
        /* @var RecaptchaTrue $constraint */

        if (null === $value || '' === $value) {
            return;
        }

        $response = $this->recaptcha->verify($value, $this->ipService->getIp());

        if (!$response->isSuccess()) {
            $this->context->addViolation($constraint->message);
        }
    }
}

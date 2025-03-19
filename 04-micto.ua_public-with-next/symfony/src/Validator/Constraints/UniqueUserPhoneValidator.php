<?php
namespace App\Validator\Constraints;

use App\Service\PhoneFormatter;
use SoftUa\UserBundle\Entity\User;
use SoftUa\UserBundle\Repository\UserRepository;
use Symfony\Component\DependencyInjection\Attribute\AutoconfigureTag;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;
use Symfony\Component\Validator\Exception\UnexpectedValueException;

#[AutoconfigureTag('validator.constraint_validator')]
class UniqueUserPhoneValidator extends ConstraintValidator
{
    public function __construct(
        private readonly TokenStorageInterface $tokenStorage,
        private readonly UserRepository $userRepo,
        private readonly PhoneFormatter $phoneFormatter,
    ) {}

    public function validate($value, Constraint $constraint)
    {
        if (!$constraint instanceof UniqueUserPhone) {
            throw new UnexpectedTypeException($constraint, UniqueUserPhone::class);
        }

        if (null === $value || '' === $value) {
            return;
        }

        if (!is_string($value)) {
            throw new UnexpectedValueException($value, 'string');
        }

        /** @var User $user */
        $user = $this->tokenStorage->getToken()?->getUser();

        $phone = $this->phoneFormatter->getClearPhoneNumber($value);

        if ($phone && $this->userRepo->getByPhone($phone, $user?->getId())) {
            $this->context->buildViolation($constraint->message)
                ->setCode(UniqueUserPhone::NOT_UNIQUE_PHONE_ERROR)
                ->addViolation();
        }
    }
}

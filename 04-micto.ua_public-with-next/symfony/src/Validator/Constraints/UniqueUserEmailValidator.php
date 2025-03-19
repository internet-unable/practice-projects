<?php
namespace App\Validator\Constraints;

use SoftUa\UserBundle\Entity\User;
use SoftUa\UserBundle\Repository\UserRepository;
use Symfony\Component\DependencyInjection\Attribute\AutoconfigureTag;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;
use Symfony\Component\Validator\Exception\UnexpectedValueException;

#[AutoconfigureTag('validator.constraint_validator')]
class UniqueUserEmailValidator extends ConstraintValidator
{
    public function __construct(
        private readonly TokenStorageInterface $tokenStorage,
        private readonly UserRepository $userRepo,
    ) {}

    public function validate($value, Constraint $constraint)
    {
        if (!$constraint instanceof UniqueUserEmail) {
            throw new UnexpectedTypeException($constraint, UniqueUserEmail::class);
        }

        if (null === $value || '' === $value) {
            return;
        }

        if (!is_string($value)) {
            throw new UnexpectedValueException($value, 'string');
        }

        /** @var User $user */
        $user = $this->tokenStorage->getToken()?->getUser();

        if ($this->userRepo->getByEmail($value, $user?->getId())) {
            $this->context->buildViolation($constraint->message)
                ->setCode(UniqueUserEmail::NOT_UNIQUE_EMAIL_ERROR)
                ->addViolation();
        }
    }
}

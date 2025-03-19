<?php

namespace App\GraphQL\User\Mutation;

use SoftUa\UserBundle\Repository\UserDataConfirmationRepository;
use SoftUa\UserBundle\Repository\UserRepository;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Email;
use TheCodingMachine\GraphQLite\Annotations\Mutation;
use TheCodingMachine\GraphQLite\Validator\Annotations\Assertion;

class ResetPasswordMutation
{
    public function __construct(
        private readonly UserRepository $userRepo,
        private readonly UserDataConfirmationRepository $confirmationRepo,
    ) {}

    #[Mutation]
    #[Assertion(for: "email", constraint: [new NotBlank(), new Email(mode: Email::VALIDATION_MODE_STRICT)])]
    public function resetPassword(string $email): bool
    {
        $user = $this->userRepo->getByLogin($email);

        if (!$user) {
            return false;
        }

        $this->confirmationRepo->createChangePasswordConfirmation($user);

        return true;
    }
}

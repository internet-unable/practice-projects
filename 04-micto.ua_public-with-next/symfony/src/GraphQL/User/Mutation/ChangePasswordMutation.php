<?php

namespace App\GraphQL\User\Mutation;

use App\GraphQL\Common\Validator\InputValidator;
use App\GraphQL\User\Input\ChangePasswordInput;
use SoftUa\UserBundle\Exceptions\ConfirmationCompletedException;
use SoftUa\UserBundle\Exceptions\ConfirmationExpiredException;
use SoftUa\UserBundle\Repository\UserDataConfirmationRepository;
use SoftUa\UserBundle\Repository\UserRepository;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use TheCodingMachine\GraphQLite\Annotations\Mutation;
use TheCodingMachine\GraphQLite\Exceptions\GraphQLException;

class ChangePasswordMutation
{
    public function __construct(
        private readonly UserRepository $userRepo,
        private readonly UserDataConfirmationRepository $confirmationRepo,
        private readonly UserPasswordHasherInterface $passwordHasher,
        private readonly InputValidator $validator,
    ) {}

    #[Mutation]
    public function changePassword(ChangePasswordInput $input): bool
    {
        $this->validator->validate($input);

        $confirmation = $this->confirmationRepo->getByPublicKey($input->code);

        if (!$confirmation) {
            throw new GraphQLException('Data not found', 404);
        }

        $confirmation->setNewValue(
            $this->passwordHasher->hashPassword($confirmation->getUser(), $input->password)
        );

        try {
            $this->confirmationRepo->applyChangePasswordConfirmation($confirmation);
        } catch (ConfirmationCompletedException|ConfirmationExpiredException $e) {
            throw new GraphQLException($e->getMessage(), 400);
        }

        return true;
    }
}

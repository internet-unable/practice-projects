<?php

namespace App\GraphQL\User\Mutation;

use App\GraphQL\Common\Validator\InputValidator;
use App\GraphQL\User\Input\UserEmailInput;
use App\GraphQL\User\Input\UserPasswordInput;
use App\GraphQL\User\Input\UserProfileInput;
use SoftUa\UserBundle\Entity\User;
use SoftUa\UserBundle\Repository\UserDataConfirmationRepository;
use SoftUa\UserBundle\Repository\UserRepository;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use TheCodingMachine\GraphQLite\Annotations\InjectUser;
use TheCodingMachine\GraphQLite\Annotations\Mutation;

class UserProfileMutation
{
    public function __construct(
        private readonly InputValidator $validator,
        private readonly UserPasswordHasherInterface $passwordHasher,
        private readonly UserRepository $userRepo,
        private readonly UserDataConfirmationRepository $confirmationRepo,
    ){}

    #[Mutation]
    public function editMyPassword(
        UserPasswordInput $input,
        #[InjectUser]
        User $user,
    ): bool
    {
        $this->validator->validate($input);

        $user->setPassword(
            $this->passwordHasher->hashPassword($user, $input->password)
        );

        $this->userRepo->save($user);

        return true;
    }

    #[Mutation]
    public function editMyEmail(
        UserEmailInput $input,
        #[InjectUser]
        User $user,
    ): User
    {
        $this->validator->validate($input);

        if ($input->email != $user->getEmail()) {
            $this->confirmationRepo->createChangeEmailConfirmation($user, $input->email);
        }

        return $user;
    }

    #[Mutation]
    public function editMyProfile(
        UserProfileInput $input,
        #[InjectUser]
        User $user,
    ): User
    {
        $this->validator->validate($input);

        $user
            ->setFirstName(trim($input->firstName))
            ->setLastName(trim($input->lastName) ?: null)
            ->setMiddleName(trim($input->middleName) ?: null)
            ->setPhone($input->phone)
        ;

        $this->userRepo->save($user);

        return $user;
    }
}

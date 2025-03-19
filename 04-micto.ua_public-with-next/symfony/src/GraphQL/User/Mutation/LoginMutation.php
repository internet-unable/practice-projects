<?php

namespace App\GraphQL\User\Mutation;

use App\GraphQL\User\Type\AuthorizationType;
use SoftUa\UserBundle\Repository\UserRepository;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use TheCodingMachine\GraphQLite\Annotations\Mutation;
use TheCodingMachine\GraphQLite\Bundle\Controller\GraphQL\InvalidUserPasswordException;

class LoginMutation
{
    public function __construct(
        private readonly UserRepository $userRepo,
        private readonly UserPasswordHasherInterface $passwordHasher,
        private readonly AuthorizationType $authorizationType,
    ) {}

    #[Mutation]
    public function login(string $username, string $password): AuthorizationType
    {
        $user = $this->userRepo->getByLogin($username);

        if (!$user || !$this->passwordHasher->isPasswordValid($user, $password)) {
            throw InvalidUserPasswordException::create();
        }

        $this->authorizationType->setUser($user);

        return $this->authorizationType;
    }
}

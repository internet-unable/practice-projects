<?php

namespace App\GraphQL\User\Mutation;

use App\GraphQL\Common\Validator\InputValidator;
use App\GraphQL\User\Input\RegisterUserInput;
use App\GraphQL\User\Type\AuthorizationType;
use SoftUa\UserBundle\Entity\User;
use SoftUa\UserBundle\Repository\UserRepository;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use TheCodingMachine\GraphQLite\Annotations\Mutation;

class UserRegistrationMutation
{
    public function __construct(
        private readonly UserRepository $userRepo,
        private readonly UserPasswordHasherInterface $passwordHasher,
        private readonly AuthorizationType $authorizationType,
        private readonly InputValidator $validator,
    ) {}

    #[Mutation]
    public function registerUser(RegisterUserInput $input): AuthorizationType
    {
        $this->validator->validate($input);

        $user = new User();
        $user
            ->setFirstName($input->firstName)
            ->setLastName($input->lastName)
            ->setEmail($input->email)
            ->setPhone($input->phone)
            ->setPassword(
                $this->passwordHasher->hashPassword(
                    $user, $input->password
                )
            )
        ;

        $this->userRepo->save($user);

        $this->authorizationType->setUser($user);

        return $this->authorizationType;
    }
}

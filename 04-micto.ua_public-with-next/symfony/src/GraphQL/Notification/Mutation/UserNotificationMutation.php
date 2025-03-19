<?php

namespace App\GraphQL\Notification\Mutation;

use App\Repository\Notification\UserNotificationRepository;
use SoftUa\UserBundle\Entity\User;
use TheCodingMachine\GraphQLite\Annotations\InjectUser;
use TheCodingMachine\GraphQLite\Annotations\Logged;
use TheCodingMachine\GraphQLite\Annotations\Mutation;
use TheCodingMachine\GraphQLite\Annotations\UseInputType;

class UserNotificationMutation
{
    public function __construct(
        private readonly UserNotificationRepository $userNotificationRepo,
    ){}

    #[Mutation]
    #[Logged]
    public function markNotificationAsRead(
        #[UseInputType(inputType:"[Int!]!")]
        array $id,
        #[InjectUser]
        User $user,
    ): bool
    {
        $this->userNotificationRepo->markAsRead($id, $user->getId());

        return true;
    }
}

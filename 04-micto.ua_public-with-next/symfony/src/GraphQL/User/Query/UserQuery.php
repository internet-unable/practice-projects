<?php

namespace App\GraphQL\User\Query;

use SoftUa\UserBundle\Entity\User;
use TheCodingMachine\GraphQLite\Annotations\Cost;
use TheCodingMachine\GraphQLite\Annotations\InjectUser;
use TheCodingMachine\GraphQLite\Annotations\Query;

class UserQuery
{
    #[Query]
    #[Cost(complexity: 10)]
    public function me(
        #[InjectUser]
        User $user
    ): User
    {
        return $user;
    }
}

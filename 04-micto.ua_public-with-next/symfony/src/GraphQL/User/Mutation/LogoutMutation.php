<?php

namespace App\GraphQL\User\Mutation;

use Gesdinet\JWTRefreshTokenBundle\Model\RefreshTokenManagerInterface;
use SoftUa\UserBundle\Entity\User;
use TheCodingMachine\GraphQLite\Annotations\InjectUser;
use TheCodingMachine\GraphQLite\Annotations\Mutation;

class LogoutMutation
{
    public function __construct(
        private readonly RefreshTokenManagerInterface $refreshTokenManager,
    ) {}

    #[Mutation]
    public function logout(
        string $refreshToken,
        #[InjectUser]
        User $user
    ): bool
    {
        $refreshTokenEntity = $this->refreshTokenManager->get($refreshToken);

        if ($refreshTokenEntity && $refreshTokenEntity->getUsername() == $user->getUserIdentifier()) {
            $this->refreshTokenManager->delete($refreshTokenEntity);
        }

        return true;
    }
}

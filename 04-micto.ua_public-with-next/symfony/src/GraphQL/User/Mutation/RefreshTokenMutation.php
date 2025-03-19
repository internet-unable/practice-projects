<?php

namespace App\GraphQL\User\Mutation;

use App\GraphQL\User\Type\AuthorizationType;
use Gesdinet\JWTRefreshTokenBundle\Model\RefreshTokenManagerInterface;
use SoftUa\UserBundle\Repository\UserRepository;
use TheCodingMachine\GraphQLite\Annotations\Mutation;
use TheCodingMachine\GraphQLite\Bundle\Controller\GraphQL\InvalidUserPasswordException;

class RefreshTokenMutation
{
    public function __construct(
        private readonly UserRepository $userRepo,
        private readonly RefreshTokenManagerInterface $refreshTokenManager,
        private readonly AuthorizationType $authorizationType,
    ) {}

    #[Mutation(name: "refreshToken")]
    public function refreshToken(string $refreshToken): AuthorizationType
    {
        $refreshTokenEntity = $this->refreshTokenManager->get($refreshToken);

        if (
            !$refreshTokenEntity
            || !$refreshTokenEntity->isValid()
            || empty($refreshTokenEntity->getUsername())
        ) {
            throw new InvalidUserPasswordException('Invalid or expired refresh token');
        }

        $user = $this->userRepo->getByLogin($refreshTokenEntity->getUsername());

        if (!$user) {
            throw new InvalidUserPasswordException('User not found');
        }

        $this->authorizationType->setUser($user);

        return $this->authorizationType;
    }
}

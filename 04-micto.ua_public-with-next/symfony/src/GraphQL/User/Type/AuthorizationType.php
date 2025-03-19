<?php

namespace App\GraphQL\User\Type;

use Gesdinet\JWTRefreshTokenBundle\Generator\RefreshTokenGeneratorInterface;
use Gesdinet\JWTRefreshTokenBundle\Model\RefreshTokenManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use SoftUa\UserBundle\Entity\User;
use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\Type;

#[Type(name: 'Authorization')]
class AuthorizationType
{
    private User $user;

    public function __construct(
        private readonly JWTTokenManagerInterface $jwtManager,
        private readonly RefreshTokenManagerInterface $refreshTokenManager,
        private readonly RefreshTokenGeneratorInterface $refreshTokenGenerator,
    ) {}

    public function setUser(User $user): void
    {
        $this->user = $user;
    }

    #[Field]
    public function getUser(): User
    {
        return $this->user;
    }

    #[Field]
    public function getAccessToken(): string
    {
        return $this->jwtManager->create($this->getUser());
    }

    #[Field]
    public function getRefreshToken(): string
    {
        $ttl = 864000; // 10 days

        $refreshToken = $this->refreshTokenManager->getLastFromUsername(
            $this->getUser()->getUserIdentifier()
        );

        if (!$refreshToken || !$refreshToken->isValid()) {
            $refreshToken = $this->refreshTokenGenerator->createForUserWithTtl($this->getUser(), $ttl);
        } else {
            $refreshToken->setValid((new \DateTime())->modify('+'.$ttl.' seconds'));
        }

        $this->refreshTokenManager->save($refreshToken);

        return $refreshToken->getRefreshToken();
    }
}

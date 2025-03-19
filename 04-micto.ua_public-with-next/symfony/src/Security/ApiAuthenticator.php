<?php

namespace App\Security;

use SoftUa\UserBundle\Repository\UserRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Http\Authenticator\AbstractAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;

class ApiAuthenticator extends AbstractAuthenticator
{
    const API_AUTHORIZATION_HEADER = 'api-auth';

    public function __construct(
        private readonly UserRepository $userRepository,
        private readonly UserPasswordHasherInterface $passwordHasher,
    ){}

    /**
     * Called on every request to decide if this authenticator should be
     * used for the request. Returning `false` will cause this authenticator
     * to be skipped.
     */
    public function supports(Request $request): ?bool
    {
        return $request->headers->has(self::API_AUTHORIZATION_HEADER);
    }

    /**
     * {@inheritdoc}
     */
    public function authenticate(Request $request): Passport
    {
        $auth = $request->headers->get(self::API_AUTHORIZATION_HEADER);

        $auth = explode(':', $auth, 2);

        $user = $this->userRepository->findOneBy(['email' => $auth[0]]);

        if (!$user) {
            throw new AuthenticationException('User not found', Response::HTTP_UNAUTHORIZED);
        }

        if (!$this->passwordHasher->isPasswordValid($user, $auth[1] ?? '')) {
            throw new AuthenticationException('Authentication failure', Response::HTTP_UNAUTHORIZED);
        }

        $userBadge = new UserBadge($user->getEmail(), function () use ($user) {
            return $user;
        });

        return new SelfValidatingPassport($userBadge);
    }

    /**
     * {@inheritdoc}
     */
    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
        return null;
    }

    /**
     * {@inheritdoc}
     */
    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): ?Response
    {
        $data = [
            'errors' => [
                [
                    'message' => strtr($exception->getMessage(), $exception->getMessageData()),
                ],
            ],
            'data' => null,
        ];

        return new JsonResponse($data, Response::HTTP_UNAUTHORIZED);
    }
}

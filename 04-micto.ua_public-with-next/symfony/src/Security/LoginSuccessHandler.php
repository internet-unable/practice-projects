<?php

namespace App\Security;

use App\Router\UserRouter;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationSuccessHandlerInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use App\Components\ApiResponse;

class LoginSuccessHandler implements AuthenticationSuccessHandlerInterface
{
    private UrlGeneratorInterface $urlGenerator;

    public function __construct(
        readonly private UserRouter $userRouter,
        UrlGeneratorInterface $urlGenerator
    ){
        $this->urlGenerator = $urlGenerator;
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token): ?Response
    {
        if ($request->isXmlHttpRequest()) {
            return (new ApiResponse())->setRedirectUrl(
                $this->urlGenerator->generate('home', [], UrlGeneratorInterface::ABSOLUTE_URL) . ltrim($this->userRouter->getUserHomePath($token->getUser()), '/')
            );
        }

        return new RedirectResponse(
            $this->userRouter->getUserHomePath($token->getUser())
        );
    }
}

<?php

namespace App\Security;

use Symfony\Component\Security\Http\Authentication\AuthenticationFailureHandlerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Components\ApiResponse;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Exception\BadCredentialsException;
use Symfony\Component\Security\Core\Exception\DisabledException;
use Symfony\Component\Security\Core\Exception\LockedException;
use Symfony\Component\Security\Core\Exception\AccountExpiredException;
use Symfony\Contracts\Translation\TranslatorInterface;

class LoginFailureHandler implements AuthenticationFailureHandlerInterface
{
    public function __construct(
        private readonly TranslatorInterface $translator
    ){}

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): Response
    {
        // Default error message
        $message = $this->translator->trans('login.default_error', [], 'validators');

        if ($exception instanceof BadCredentialsException) {
            $message = $this->translator->trans('login.bad_credentials', [], 'validators');
        } elseif ($exception instanceof DisabledException) {
            $message = $this->translator->trans('login.disabled', [], 'validators');
        } elseif ($exception instanceof LockedException) {
            $message = $this->translator->trans('login.locked', [], 'validators');
        } elseif ($exception instanceof AccountExpiredException) {
            $message = $this->translator->trans('login.account_expired', [], 'validators');
        }

        if ($request->isXmlHttpRequest()) {
            return (new ApiResponse())->addError($message);
        }

        return new Response(
            $message,
            Response::HTTP_UNAUTHORIZED
        );
    }
}

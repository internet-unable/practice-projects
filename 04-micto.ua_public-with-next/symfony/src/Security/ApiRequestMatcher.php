<?php

namespace App\Security;

use Lexik\Bundle\JWTAuthenticationBundle\TokenExtractor\TokenExtractorInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestMatcherInterface;

class ApiRequestMatcher implements RequestMatcherInterface
{
    public function __construct(
        protected readonly TokenExtractorInterface $tokenExtractor
    ) {}

    public function matches(Request $request): bool
    {
        if (
            preg_match('/^\/graphql/i', $request->getRequestUri())
            && $this->tokenExtractor->extract($request)
        ) {
            return true;
        }

        return false;
    }
}

<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\RequestStack;

class ClientIpService
{
    public function __construct(
        private readonly RequestStack $requestStack,
    ){}

    public function getIp(): ?string
    {
        $request = $this->requestStack->getMainRequest();

        if (!$request) {
            return null;
        }

        $ip = $request->server->get('HTTP_X_REAL_IP')
            ?? $request->server->get('HTTP_X_FORWARDED_FOR')
            ?? $request->getClientIp();

        if ($ip && str_contains($ip, ',')) {
            $ip = explode(',', $ip)[0];
        }

        return $ip;
    }
}

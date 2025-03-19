<?php

namespace SoftUa\UserBundle\Security;

use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;

trait isGrantedTrait
{
    public function __construct(
        private readonly AuthorizationCheckerInterface $authorizationChecker,
    ){}

    private function isGranted(mixed $attribute, mixed $subject = null): bool
    {
        return $this->authorizationChecker->isGranted($attribute, $subject);
    }
}

<?php

namespace SoftUa\UserBundle\Security;

use SoftUa\UserBundle\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

class BundlePermissionsVoter extends Voter
{
    public function __construct(
        private readonly BundlePermissionsRepository $permissionsRepository,
    ){}

    protected function supports(string $attribute, mixed $subject): bool
    {
        return in_array($attribute, array_keys($this->permissionsRepository->getPermissions()));
    }

    protected function voteOnAttribute(string $attribute, mixed $subject, TokenInterface $token): bool
    {
        /** @var User $user */
        if (!$user = $token->getUser()) {
            return false;
        }

        return $user->hasPermission($attribute);
    }
}

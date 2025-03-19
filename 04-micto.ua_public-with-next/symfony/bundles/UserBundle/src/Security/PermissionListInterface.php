<?php

namespace SoftUa\UserBundle\Security;

use Symfony\Component\DependencyInjection\Attribute\AutoconfigureTag;

#[AutoconfigureTag('admin.security.bundlePermissions')]
interface PermissionListInterface
{
    /**
     * Should return permission group title
     *
     * @return string
     */
    public function getName(): string;

    /**
     * Should return an array of permission items list
     *
     * @return PermissionListItem[]
     */
    public function getPermissions(): array;
}

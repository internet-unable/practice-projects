<?php

namespace SoftUa\UserBundle\Security;

use SoftUa\UserBundle\Exceptions\UserException;

abstract class AbstractPermissionList implements PermissionListInterface
{
    protected const PERMISSIONS = [];

    public function getName(): string
    {
        throw new UserException('Permission list name should not be empty');
    }

    /**
     * @return PermissionListItem[]
     */
    public function getPermissions(): array
    {
        $permissions = [];

        foreach (static::PERMISSIONS as $code => $description) {
            $permission = new PermissionListItem();
            $permission->setCode($code);
            $permission->setDescription($description);
            $permission->setGroup($this->getName());

            $permissions[] = $permission;
        }

        return $permissions;
    }
}

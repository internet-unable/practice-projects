<?php
namespace SoftUa\UserBundle\Configuration\Permission;

use SoftUa\UserBundle\Security\PermissionListInterface;
use SoftUa\UserBundle\Security\PermissionListItem;
use Symfony\Component\DependencyInjection\Attribute\AsTaggedItem;

#[AsTaggedItem(priority: 10)]
class UserBundlePermissions implements PermissionListInterface
{
    const ROLES_MANAGEMENT = 'ROLES_MANAGEMENT';
    const USERS_MANAGEMENT = 'USERS_MANAGEMENT';
    const USERS_ENTITY_ACCESS = 'USERS_ENTITY_ACCESS';

    private const PERMISSIONS = [
        self::ROLES_MANAGEMENT => 'Roles management',
        self::USERS_MANAGEMENT => 'Users management',
        self::USERS_ENTITY_ACCESS => 'Users entity access management',
    ];

    public function getName(): string
    {
        return 'User bundle';
    }

    /**
     * @return PermissionListItem[]
     */
    public function getPermissions(): array
    {
        $permissions = [];

        foreach (self::PERMISSIONS as $code => $description) {
            $permission = new PermissionListItem();
            $permission->setCode($code);
            $permission->setDescription($description);
            $permission->setGroup($this->getName());

            $permissions[] = $permission;
        }

        return $permissions;
    }
}

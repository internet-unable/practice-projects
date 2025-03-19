<?php

namespace SoftUa\UserBundle\Security;

use SoftUa\UserBundle\Entity\RolePermission;
use Symfony\Component\DependencyInjection\Attribute\TaggedIterator;

class BundlePermissionsRepository
{
    private iterable $bundleList;

    public function __construct(
        #[TaggedIterator('admin.security.bundlePermissions')]
        iterable $bundleList
    )
    {
        $this->bundleList = $bundleList;
    }

    /**
     * todo: add cache
     *
     * @return array<string, PermissionListItem> 'Group name' => PermissionListItem
     */
    public function getPermissionGroups(): array
    {
        $rootPermission = new PermissionListItem();
        $rootPermission->setGroup('root');
        $rootPermission->setCode(RolePermission::PERMISSION_SUPER_ADMIN);
        $rootPermission->setDescription('All possible rights');

        $permissions = [
            $rootPermission->getGroup() => [$rootPermission],
        ];

        foreach ($this->bundleList as $bundlePermissionList) {
            $permissions[$bundlePermissionList->getName()] = $bundlePermissionList->getPermissions();
        }

        return $permissions;
    }

    /**
     * @return array<string,string> ['PERM_CODE'=>'Description']
     */
    public function getPermissions(): array
    {
        $codes = [];

        foreach ($this->getPermissionGroups() as $permissionItems) {
            foreach ($permissionItems as $permissionItem) {
                $codes[$permissionItem->getCode()] = $permissionItem->getDescription();
            }
        }

        return $codes;
    }
}

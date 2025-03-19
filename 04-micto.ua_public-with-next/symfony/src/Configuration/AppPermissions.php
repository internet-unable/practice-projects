<?php
namespace App\Configuration;

use SoftUa\UserBundle\Security\AbstractPermissionList;
use Symfony\Component\DependencyInjection\Attribute\AsTaggedItem;

#[AsTaggedItem(priority: 10)]
class AppPermissions extends AbstractPermissionList
{
    protected const PERMISSIONS = [
        'INSTITUTION_MANAGER' => 'Institution manager',
        'PATIENT' => 'Patient',
    ];

    public function getName(): string
    {
        return 'App';
    }
}

<?php

namespace App\Service;

use App\Entity\Institution\Institution;
use App\Entity\Institution\InstitutionUnit;
use App\Entity\Institution\InstitutionUnitDepartment;
use App\Repository\UserPermissionRepository;
use Doctrine\ORM\EntityManagerInterface;

class UserEntityAccessService
{
    public function __construct(
        private readonly UserPermissionRepository $permissionRepository,
        private readonly EntityManagerInterface $em,
    ){}

    public function hasAccess(
        Institution|InstitutionUnit|InstitutionUnitDepartment $entity,
        int $userId
    ): bool
    {
        return match(true) {
            $entity instanceof Institution => $this->permissionRepository->hasInstitutionAccess($entity, $userId),
            $entity instanceof InstitutionUnit => $this->permissionRepository->hasInstitutionUnitAccess($entity, $userId),
            $entity instanceof InstitutionUnitDepartment => $this->permissionRepository->hasUnitDepartmentAccess($entity, $userId),
        };
    }
}

<?php

namespace App\Service;

use App\Entity\Institution\Institution;
use App\Entity\Institution\InstitutionUnit;
use App\Entity\Institution\InstitutionUnitDepartment;
use App\Entity\UserEntity\UserEntityInterface;
use App\Entity\UserEntity\UserEntityType;
use App\Repository\Institution\UserEntityRepository;
use App\Repository\UserPermissionRepository;
use Doctrine\ORM\EntityManagerInterface;

class UserEntityService
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

    public function resolveEntity(
        int $entityId,
        UserEntityType $entityType
    ): UserEntityInterface
    {
        /** @var UserEntityRepository */
        $entityRepo = $this->getRepoByType($entityType);

        return $entityRepo->getOneById($entityId);
    }

    // todo: Find out how to map correctly
    //  : AbstractInstitutionRepository and :UserEntityRepository
    //  doesn't match to EntityRepository returned by getRepository()
    private function getRepoByType(UserEntityType $entityType)
    {
        return match($entityType){
            UserEntityType::INSTITUTION => $this->em->getRepository(Institution::class),
            UserEntityType::INSTITUTION_UNIT => $this->em->getRepository(InstitutionUnit::class),
            UserEntityType::UNIT_DEPARTMENT => $this->em->getRepository(InstitutionUnitDepartment::class),
        };
    }
}

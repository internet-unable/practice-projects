<?php

namespace App\Repository;

use App\Entity\Institution\Institution;
use App\Entity\Institution\InstitutionUnit;
use App\Entity\Institution\InstitutionUnitDepartment;
use App\Entity\UserEntity\UserEntityPermission;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\QueryBuilder;
use Doctrine\Persistence\ManagerRegistry;
use SoftUa\UserBundle\Entity\User;

class UserPermissionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, UserEntityPermission::class);
    }

    public function hasInstitutionAccess(
        Institution $institution,
        int $userId
    ): bool
    {
        $query = $this->createQueryBuilder('up');
        $this->injectFilterByInstitution($query, $institution);
        $this->injectUserFilter($query, $userId);

        return (bool)$query
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function hasInstitutionUnitAccess(
        InstitutionUnit $institutionUnit,
        int $userId
    ): bool
    {
        $query = $this->createQueryBuilder('up');
        $this->injectFilterByUnit($query, $institutionUnit);
        $this->injectUserFilter($query, $userId);

        return (bool)$query
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function hasUnitDepartmentAccess(
        InstitutionUnitDepartment $unitDepartment,
        int $userId
    ): bool
    {
        $query = $this->createQueryBuilder('up');
        $this->injectFilterByUnitDepartment($query, $unitDepartment);
        $this->injectUserFilter($query, $userId);

        return (bool)$query
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();
    }

    /**
     * @return User[]
     */
    public function getUsersWithAccessToEntity(
        Institution|InstitutionUnit|InstitutionUnitDepartment $entity,
    ): array
    {
        $query = $this->getEntityManager()
            ->getRepository(User::class)
            ->createQueryBuilder('u')
            ->innerJoin(UserEntityPermission::class, 'up', 'WITH', 'u.id = up.user')
        ;

        match(true) {
            $entity instanceof Institution => $this->injectFilterByInstitution($query, $entity),
            $entity instanceof InstitutionUnit => $this->injectFilterByUnit($query, $entity),
            $entity instanceof InstitutionUnitDepartment => $this->injectFilterByUnitDepartment($query, $entity),
        };

         return $query->getQuery()->getResult();
    }

    private function injectFilterByUnitDepartment(
        QueryBuilder $query,
        InstitutionUnitDepartment $unitDepartment,
    ): void
    {
        $expr = $this->getEntityManager()->getExpressionBuilder();

        $query
            ->andWhere($expr->orX(
                'up.institution = :institutionId AND up.institutionUnit IS NULL',
                'up.institutionUnit = :unitId AND up.unitDepartment IS NULL',
                'up.unitDepartment = :departmentId',
            ))
            ->setParameter('institutionId', $unitDepartment->getUnit()->getInstitution()->getId())
            ->setParameter('unitId', $unitDepartment->getUnit()->getId())
            ->setParameter('departmentId', $unitDepartment->getId())
        ;
    }

    private function injectFilterByUnit(
        QueryBuilder $query,
        InstitutionUnit $institutionUnit,
    ): void
    {
        $expr = $this->getEntityManager()->getExpressionBuilder();

        $query
            ->andWhere($expr->orX(
                'up.institution = :institutionId AND up.institutionUnit IS NULL',
                'up.institutionUnit = :unitId AND up.unitDepartment IS NULL',
            ))
            ->setParameter('institutionId', $institutionUnit->getInstitution()->getId())
            ->setParameter('unitId', $institutionUnit->getId())
        ;
    }

    private function injectFilterByInstitution(
        QueryBuilder $query,
        Institution $institution,
    ): void
    {
        $query
            ->andWhere('up.institution = :institutionId AND up.institutionUnit IS NULL')
            ->setParameter('institutionId', $institution->getId())
        ;
    }

    protected function injectUserFilter(QueryBuilder $query, int $userId): void
    {
        $query
            ->andWhere('up.user = :userId')
            ->setParameter('userId', $userId)
        ;
    }
}

<?php

namespace App\Repository\Institution;

use App\Entity\Institution\InstitutionUnitDepartment;
use App\Entity\UserEntity\UserEntityPermission;
use Doctrine\ORM\AbstractQuery;
use Doctrine\ORM\QueryBuilder;
use Doctrine\ORM\Tools\Pagination\Paginator;
use Doctrine\Persistence\ManagerRegistry;

class InstitutionUnitDepartmentRepository extends AbstractInstitutionRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, InstitutionUnitDepartment::class);
    }

    public function getOneByOldId(int $id): ?InstitutionUnitDepartment
    {
        return $this->getActiveQuery()
            ->andWhere('ud.oldId = :id')
            ->setParameter('id', $id)
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function getOneById(int $id): ?InstitutionUnitDepartment
    {
        return $this->getActiveQuery()
            ->andWhere('ud.id = :id')
            ->setParameter('id', $id)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function getListByIds(array $ids): array
    {
        return $this->getActiveQuery()
            ->andWhere('ud.id in(:ids)')
            ->setParameter('ids', $ids)
            ->getQuery()
            ->getResult();
    }

    public function findByInstitutionUnitId(int $id): array
    {
        return $this->getQueryByInstitutionUnitId($id)
            ->getQuery()
            ->getResult();
    }

    public function getQueryByInstitutionUnitId(int $id): QueryBuilder
    {
        return $this->getActiveQuery()
            ->join('ud.unit', 'u')
            ->andWhere('u.isPublished = true')
            ->andWhere('u.institution = :id')
            ->setParameter('id', $id);
    }

    public function countAllActive(): int
    {
        $query = $this->getActiveQuery()
            ->join('ud.unit', 'u')
            ->andWhere('u.isPublished = true');

        return (new Paginator($query))->count();
    }

    public function findAllActive(
        int $limit = null,
        int $offset = null,
        int $hydrationMode = AbstractQuery::HYDRATE_OBJECT
    ): array
    {
        $query = $this->getActiveQuery()
            ->select(['ud', 'u'])
            ->join('ud.unit', 'u')
            ->andWhere('u.isPublished = true');

        if ($limit) {
            $query->setMaxResults($limit);
        }

        if ($offset) {
            $query->setFirstResult($offset);
        }

        return $query->getQuery()->getResult($hydrationMode);
    }

    /**
     * @param int $userId
     * @param int|null $unitId
     *
     * @return InstitutionUnitDepartment[]
     */
    public function getForUser(int $userId, int $unitId = null): array
    {
        $query = $this->createQueryBuilder('d')
            ->distinct()
            ->leftJoin('d.unit', 'u')
            ->join(UserEntityPermission::class, 'up', 'WITH', '(
                (u.institution = up.institution AND up.institutionUnit IS NULL)
                OR (u.id = up.institutionUnit AND up.unitDepartment IS NULL)
                OR d.id = up.unitDepartment
            )')
            ->andWhere('up.user = :userId')
            ->setParameter('userId', $userId);

        if ($unitId) {
            $query
                ->andWhere('u.id = :unitId')
                ->setParameter('unitId', $unitId);
        }

        return $query->getQuery()->getResult();
    }

    private function getActiveQuery(string $alias = 'ud'): QueryBuilder
    {
        return $this->createQueryBuilder($alias)
            ->andWhere("$alias.isPublished = true");
    }

    public function save(InstitutionUnitDepartment $unitDepartment): void
    {
        $this->_em->persist($unitDepartment);
        $this->_em->flush();
    }
}

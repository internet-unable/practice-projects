<?php

namespace App\Repository\Institution;

use App\Entity\Institution\InstitutionUnit;
use App\Entity\UserEntity\UserEntityPermission;
use Doctrine\ORM\AbstractQuery;
use Doctrine\ORM\Query\Expr\Join;
use Doctrine\ORM\QueryBuilder;
use Doctrine\ORM\Tools\Pagination\Paginator;
use Doctrine\Persistence\ManagerRegistry;

class InstitutionUnitRepository extends AbstractInstitutionRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, InstitutionUnit::class);
    }

    public function getInstitutionUnitsQuery(): QueryBuilder
    {
        return $this->getActiveQuery();
    }

    public function getOneByOldId(int $id): ?InstitutionUnit
    {
        return $this->getActiveQuery()
            ->andWhere('iu.oldId = :id')
            ->setParameter('id', $id)
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function getOneById(int $id): ?InstitutionUnit
    {
        return $this->getActiveQuery()
            ->andWhere('iu.id = :id')
            ->setParameter('id', $id)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function getListByIds(array $ids): array
    {
        return $this->getActiveQuery()
            ->andWhere('iu.id in(:ids)')
            ->setParameter('ids', $ids)
            ->getQuery()
            ->getResult();
    }

    public function findByInstitutionId(int $id): array
    {
        return $this->getActiveQuery()
            ->andWhere('iu.institution = :id')
            ->setParameter('id', $id)
            ->getQuery()
            ->getResult();
    }

    /**
     * @param string $name
     * @param int $limit
     * @param int|null $offset
     *
     * @return InstitutionUnit[]
     */
    public function findByName(
        string $name,
        int $limit = 5,
        int $offset = null,
    ): array
    {
        $query = $this->getActiveQuery()
            ->orderBy('iu.name')
            ->setMaxResults($limit)
        ;

        if ($offset) {
            $query->setFirstResult($offset);
        }

        $this->injectSearchQuery($query, $name);

        return $query->getQuery()->getResult();
    }

    /**
     * @param string $name
     *
     * @return int
     */
    public function countByName(string $name): int
    {
        $query = $this->getActiveQuery();
        $this->injectSearchQuery($query, $name);

        return (new Paginator($query))->count();
    }

    public function getByUnitType(int $typeId): array
    {
        return $this->getActiveQuery()
            ->andWhere('iu.type = :type')
            ->setParameter('type', $typeId)
            ->orderBy('iu.name')
            ->getQuery()
            ->getResult();
    }

    public function countAllByParams(
        int $areaId = null,
        int $unitTypeId = null,
        array $cityIds = [],
        array $districtIds = [],
        array $cityDistrictIds = [],
        bool $onlyWithComments = false,
    ): int
    {
        $query = $this->allByParamsQuery(
            $areaId,
            $unitTypeId ? [$unitTypeId] : [],
            $cityIds,
            $districtIds,
            $cityDistrictIds,
            $onlyWithComments
        );

        return (new Paginator($query))->count();
    }

    public function findAllByParams(
        int $areaId = null,
        int $unitTypeId = null,
        array $cityIds = [],
        array $districtIds = [],
        array $cityDistrictIds = [],
        bool $onlyWithComments = false,
        int $limit = null,
        int $offset = null,
        int $hydrationMode = AbstractQuery::HYDRATE_OBJECT
    ): array
    {
        $query = $this->allByParamsQuery(
            $areaId,
            $unitTypeId ? [$unitTypeId] : [],
            $cityIds,
            $districtIds,
            $cityDistrictIds,
            $onlyWithComments
        );

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
     * @param int|null $institutionId
     *
     * @return InstitutionUnit[]
     */
    public function getForUser(int $userId, int $institutionId = null): array
    {
        $query = $this->createQueryBuilder('u')
            ->distinct()
            ->join(UserEntityPermission::class, 'up', 'WITH', '(
                (u.institution = up.institution AND up.institutionUnit IS NULL) 
                OR u.id = up.institutionUnit
            )')
            ->andWhere('up.user = :userId')
            ->setParameter('userId', $userId);

        if ($institutionId) {
            $query
                ->andWhere('u.institution = :instId')
                ->setParameter('instId', $institutionId);
        }

        return $query->getQuery()->getResult();
    }

    public function save(InstitutionUnit $institutionUnit): void
    {
        $this->_em->persist($institutionUnit);
        $this->_em->flush();
    }

    public function allByParamsQuery(
        int   $areaId = null,
        array $unitTypeIds = [],
        array $cityIds = [],
        array $districtIds = [],
        array $cityDistrictIds = [],
        bool  $onlyWithComments = false,
        int   $institutionId = null,
    ): QueryBuilder
    {
        $query = $this->getActiveQuery()
            ->orderBy('iu.name')
            ->groupBy('iu.id')
        ;

        if ($institutionId) {
            $query->andWhere('iu.institution = :institutionId')->setParameter('institutionId', $institutionId);
        }

        if ($areaId) {
            $query->andWhere('c.area = :area')->setParameter('area', $areaId);
        }

        if (!empty($unitTypeIds)) {
            $query->andWhere('iu.type IN(:types)')->setParameter('types', $unitTypeIds);
        }

        if ($onlyWithComments) {
            $query->join('iu.comments', 'com', Join::WITH, 'com.isPublished = :isPublished');
            $query->setParameter('isPublished', true);
        }

        $orExpr = $query->expr()->orX();

        if (!empty($cityIds)) {
            $orExpr->add($query->expr()->in('c.id', ':cities'));
            $orExpr->add($query->expr()->in('c.oldId', ':cities'));
            $query->setParameter('cities', $cityIds);
        }        

        if (!empty($districtIds)) {
            $orExpr->add($query->expr()->in('c.district', ':districts'));
            $query->setParameter('districts', $districtIds);
        }

        if (!empty($cityDistrictIds)) {
            $orExpr->add($query->expr()->in('iu.cityDistrict', ':cityDistrictIds'));
            $query->setParameter('cityDistrictIds', $cityDistrictIds);
        }

        if ($orExpr->count()) {
            $query->andWhere($orExpr);
        }

        return $query;
    }

    private function getActiveQuery(): QueryBuilder
    {
        return $this->createQueryBuilder('iu')
            ->join('iu.city', 'c')
            ->join('c.area', 'a')
            ->andWhere('a.isPublished = true')
            ->andWhere('iu.isPublished = true');
    }

    private function injectSearchQuery(QueryBuilder $query, string $searchTerm): void
    {
        foreach (explode(' ', $searchTerm) as $key => $word) {
            $query
                ->andWhere('iu.name LIKE :qs'.$key)
                ->setParameter('qs'.$key, '%'.$word.'%')
            ;
        }
    }
}

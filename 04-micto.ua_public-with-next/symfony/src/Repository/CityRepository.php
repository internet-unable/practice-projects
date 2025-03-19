<?php

namespace App\Repository;

use App\Entity\City;
use App\Entity\CityType;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Query\Expr\Join;
use Doctrine\ORM\QueryBuilder;
use Doctrine\ORM\Tools\Pagination\Paginator;
use Doctrine\Persistence\ManagerRegistry;

class CityRepository extends ServiceEntityRepository implements TerritorialUnitRepositoryInterface
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, City::class);
    }

    public function getOneByOldId(int $id): ?City
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.oldId = :id')
            ->setParameter('id', $id)
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function findOneById(int $id): ?City
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.id = :id')
            ->setParameter('id', $id)
            ->getQuery()
            ->getOneOrNullResult();
    }

    // TODO: Додати вибірку з врахуванням наявних медзакладів
    public function findAreaCenters(): array
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.areaCenter = 1')
            ->getQuery()
            ->getResult();
    }

    public function findAreaCentersQuery(): QueryBuilder
    {
        $query = $this->createQueryBuilder('c')
            ->andWhere('c.areaCenter = 1');

        return $query;
    }

    public function findByDistrictIdQuery(int $districtId, ?string $searchString = null): QueryBuilder
    {
        $query = $this->createQueryBuilder('c')
            ->andWhere('c.district = :districtId')
            ->setParameter('districtId', $districtId)
            ->orderBy('c.name');

        if ($searchString) {
            $this->injectSearchQuery($query, $searchString);
        }

        return $query;
    }

    /**
     * @param int|null $areaId
     * @param int|null $unitTypeId
     * @param int|null $districtId
     * @param string|null $name
     * @param array $cityTypes
     * @param bool $onlyWithComments
     * @param int|null $limit
     * @param int|null $offset
     *
     * @return City[]
     */
    public function findWithUnitsByParams(
        int $areaId = null,
        int $unitTypeId = null,
        int $districtId = null,
        string $name = null,
        array $cityTypes = [],
        bool $onlyWithComments = false,
        int $limit = null,
        int $offset = null,
    ): array
    {
        $query = $this->allWithUnitsByParamsQuery(
            $areaId,
            $unitTypeId,
            $districtId,
            $name,
            $cityTypes,
            $onlyWithComments,
        );

        if ($limit) {
            $query->setMaxResults($limit);
        }

        if ($offset) {
            $query->setFirstResult($offset);
        }

        return $query->getQuery()->getResult();
    }

    /**
     * @param int|null $areaId
     * @param int|null $unitTypeId
     * @param int|null $districtId
     * @param string|null $name
     * @param array $cityTypes
     * @param bool $onlyWithComments
     *
     * @return int
     */
    public function countAllWithUnitsByParams(
        int $areaId = null,
        int $unitTypeId = null,
        int $districtId = null,
        string $name = null,
        array $cityTypes = [],
        bool $onlyWithComments = false,
    ): int
    {
        $query = $this->allWithUnitsByParamsQuery(
            $areaId,
            $unitTypeId,
            $districtId,
            $name,
            $cityTypes,
            $onlyWithComments
        );

        return (new Paginator($query))->count();
    }

    public function save(City $city): void
    {
        $this->_em->persist($city);
        $this->_em->flush();
    }

    /**
     * @param int|null $areaId
     * @param int|null $unitTypeId
     * @param int|null $districtId
     * @param string|null $name
     * @param array $cityTypes
     *
     * @return QueryBuilder
     */
    public function allWithUnitsByParamsQuery(
        int $areaId = null,
        int $unitTypeId = null,
        int $districtId = null,
        string $name = null,
        array $cityTypes = [],
        bool $onlyWithComments = false,
    ): QueryBuilder
    {
        $query = $this->createQueryBuilder('c')
            ->join('c.units', 'u', 'WITH', 'u.isPublished = :isPublished')
            ->join('c.area', 'a', 'WITH', 'a.isPublished = :isPublished')
            ->setParameter('isPublished', true)
            ->orderBy('c.name')
            ->groupBy('c.id')
        ;

        if ($areaId) {
            $query->andWhere('c.area = :areaId')->setParameter('areaId', $areaId);
        }

        if ($unitTypeId) {
            $query->andWhere('u.type = :typeId')->setParameter('typeId', $unitTypeId);
        }

        if (!empty($cityTypes)) {
            $query->andWhere('c.type in(:types)')->setParameter('types', $cityTypes);
        }

        if (!empty($districtId)) {
            $query->andWhere('c.district = :district')->setParameter('district', $districtId);
        }

        if (!empty($name)) {
            $this->injectSearchQuery($query, $name);
        }

        if ($onlyWithComments) {
            $query->join('u.comments', 'com', Join::WITH, 'com.isPublished = :isPublished');
        }

        return $query;
    }

    private function injectSearchQuery(QueryBuilder $query, string $searchTerm): void
    {
        foreach (explode(' ', $searchTerm) as $key => $word) {
            $query
                ->andWhere('c.name LIKE :qs'.$key)
                ->setParameter('qs'.$key, '%'.$word.'%')
            ;
        }
    }
}

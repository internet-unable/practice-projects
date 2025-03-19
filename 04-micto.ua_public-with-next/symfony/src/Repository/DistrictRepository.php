<?php

namespace App\Repository;

use App\Entity\District;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Query\Expr\Join;
use Doctrine\ORM\QueryBuilder;
use Doctrine\ORM\Tools\Pagination\Paginator;
use Doctrine\Persistence\ManagerRegistry;

class DistrictRepository extends ServiceEntityRepository implements TerritorialUnitRepositoryInterface
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, District::class);
    }

    public function getOneByOldId(int $id): ?District
    {
        return $this->createQueryBuilder('d')
            ->andWhere('d.oldId = :id')
            ->setParameter('id', $id)
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function getOneById(int $id): ?District
    {
        return $this->createQueryBuilder('d')
            ->andWhere('d.id = :id')
            ->setParameter('id', $id)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function findByAreaIdQuery(int $areaId, ?string $searchString = null): QueryBuilder
    {
        $query = $this->createQueryBuilder('d')
            ->andWhere('d.area = :areaId')
            ->setParameter('areaId', $areaId)
            ->orderBy('d.name')
        ;

        if ($searchString) {
            $this->injectSearchQuery($query, $searchString);
        }

        return $query;
    }

    /**
     * @param int|null $areaId
     * @param int|null $unitTypeId
     * @param string|null $name
     * @param bool $onlyWithComments
     * @param int|null $limit
     * @param int|null $offset
     *
     * @return District[]
     */
    public function findWithUnitsByParams(
        int $areaId = null,
        int $unitTypeId = null,
        string $name = null,
        bool $onlyWithComments = false,
        int $limit = null,
        int $offset = null,
    ): array
    {
        $query = $this->allWithUnitsByParamsQuery(
            $areaId,
            $unitTypeId,
            $name,
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
     * @param string|null $name
     * @param bool $onlyWithComments
     *
     * @return int
     */
    public function countAllWithUnitsByParams(
        int $areaId = null,
        int $unitTypeId = null,
        string $name = null,
        bool $onlyWithComments = false,
    ): int
    {
        $query = $this->allWithUnitsByParamsQuery(
            $areaId,
            $unitTypeId,
            $name,
            $onlyWithComments
        );

        return (new Paginator($query))->count();
    }

    public function save(District $district): void
    {
        $this->_em->persist($district);
        $this->_em->flush();
    }

    /**
     * @param int|null $areaId
     * @param int|null $unitTypeId
     * @param string|null $name
     * @param bool $onlyWithComments
     *
     * @return QueryBuilder
     */
    public function allWithUnitsByParamsQuery(
        int $areaId = null,
        int $unitTypeId = null,
        string $name = null,
        bool $onlyWithComments = false,
    ): QueryBuilder
    {
        $query = $this->createQueryBuilder('d')
            ->join('d.cities', 'c')
            ->join('d.area', 'a', 'WITH', 'a.isPublished = :isPublished')
            ->join('c.units', 'u', 'WITH', 'u.isPublished = :isPublished')
            ->setParameter('isPublished', true)
            ->orderBy('d.name')
            ->groupBy('d.id')
        ;

        if ($areaId) {
            $query->andWhere('d.area = :areaId')->setParameter('areaId', $areaId);
        }

        if ($unitTypeId) {
            $query->andWhere('u.type = :typeId')->setParameter('typeId', $unitTypeId);
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
                ->andWhere('d.name LIKE :qs'.$key)
                ->setParameter('qs'.$key, '%'.$word.'%')
            ;
        }
    }
}

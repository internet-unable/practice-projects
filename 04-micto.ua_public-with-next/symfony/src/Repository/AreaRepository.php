<?php

namespace App\Repository;

use App\Entity\Area;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Query\Expr\Join;
use Doctrine\ORM\QueryBuilder;
use Doctrine\ORM\Tools\Pagination\Paginator;
use Doctrine\Persistence\ManagerRegistry;

class AreaRepository extends ServiceEntityRepository implements TerritorialUnitRepositoryInterface
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Area::class);
    }

    public function getOneByOldId(int $id): ?Area
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.oldId = :id')
            ->setParameter('id', $id)
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function getOneById(int $id): ?Area
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.id = :id')
            ->setParameter('id', $id)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function getListQuery(?string $searchString = null): QueryBuilder
    {
        $query = $this->createQueryBuilder('a')
            ->orderBy('a.name');


        if ($searchString) {
            $this->injectSearchQuery($query, $searchString);
        }

        return $query;
    }

    /**
     * @param int|null $unitTypeId
     * @param string|null $name
     * @param bool $onlyWithComments
     * @param int|null $limit
     * @param int|null $offset
     *
     * @return Area[]
     */
    public function findWithUnitsByParams(
        int $unitTypeId = null,
        string $name = null,
        bool $onlyWithComments = false,
        int $limit = null,
        int $offset = null,
    ): array
    {
        $query = $this->allWithUnitsByParamsQuery($unitTypeId, $name, $onlyWithComments);

        if ($limit) {
            $query->setMaxResults($limit);
        }

        if ($offset) {
            $query->setFirstResult($offset);
        }

        return $query->getQuery()->getResult();
    }

    /**
     * @param int|null $unitTypeId
     * @param string|null $name
     * @param bool $onlyWithComments
     *
     * @return int
     */
    public function countAllWithUnitsByParams(
        int $unitTypeId = null,
        string $name = null,
        bool $onlyWithComments = false,
    ): int
    {
        $query = $this->allWithUnitsByParamsQuery($unitTypeId, $name, $onlyWithComments);

        return (new Paginator($query))->count();
    }

    public function save(Area $area): void
    {
        $this->_em->persist($area);
        $this->_em->flush();
    }

    /**
     * @param int|null $unitTypeId
     * @param string|null $name
     * @param bool $onlyWithComments
     *
     * @return QueryBuilder
     */
    public function allWithUnitsByParamsQuery(
        int $unitTypeId = null,
        string $name = null,
        bool $onlyWithComments = false,
    ): QueryBuilder
    {
        $query = $this->createQueryBuilder('a')
            ->join('a.cities', 'c')
            ->join('c.units', 'u')
            ->andWhere('a.isPublished = :isPublished')
            ->andWhere('u.isPublished = :isPublished')
            ->setParameter('isPublished', true)
            ->orderBy('a.name')
            ->groupBy('a.id')
        ;

        if ($unitTypeId) {
            $query->andWhere('u.type = :type')->setParameter('type', $unitTypeId);
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
                ->andWhere('a.name LIKE :qs'.$key)
                ->setParameter('qs'.$key, '%'.$word.'%')
            ;
        }
    }
}

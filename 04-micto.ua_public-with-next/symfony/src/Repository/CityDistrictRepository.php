<?php

namespace App\Repository;

use App\Entity\CityDistrict;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Query\Expr\Join;
use Doctrine\ORM\QueryBuilder;
use Doctrine\Persistence\ManagerRegistry;

class CityDistrictRepository extends ServiceEntityRepository implements TerritorialUnitRepositoryInterface
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, CityDistrict::class);
    }

    public function getOneByOldId(int $id): ?CityDistrict
    {
        return $this->createQueryBuilder('cd')
            ->andWhere('cd.oldId = :id')
            ->setParameter('id', $id)
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function findOneById(int $id): ?CityDistrict
    {
        return $this->createQueryBuilder('cd')
            ->andWhere('cd.id = :id')
            ->setParameter('id', $id)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function findWithUnitsByParams(
        int $cityId = null,
        string $name = null,
        bool $onlyWithComments = false,
        int $limit = null,
        int $offset = null,
    ): array
    {
        $query = $this->allWithUnitsByParamsQuery(
            $cityId,
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
     * @param int|null $cityId
     * @param string|null $name
     * @param bool $onlyWithComments
     *
     * @return QueryBuilder
     */
    public function allWithUnitsByParamsQuery(
        int $cityId = null,
        string $name = null,
        bool $onlyWithComments = false,
    ): QueryBuilder
    {
        $query = $this->createQueryBuilder('cd')
            ->join('cd.units', 'u', 'WITH', 'u.isPublished = :isPublished')
            ->setParameter('isPublished', true)
            ->orderBy('cd.name')
            ->groupBy('cd.id')
        ;

        if ($cityId) {
            $query->andWhere('cd.city = :cityId')->setParameter('cityId', $cityId);
        }

        if (!empty($name)) {
            $this->injectSearchQuery($query, $name);
        }

        if ($onlyWithComments) {
            $query->join('u.comments', 'com', Join::WITH, 'com.isPublished = :isPublished');
        }

        return $query;
    }

    public function findByCityId(int $cityId): array
    {
        return $this->findByCityIdQuery($cityId)
            ->getQuery()
            ->getResult();
    }

    public function findByCityIdQuery(int $cityId, ?string $searchString = null): QueryBuilder
    {
        $query = $this->createQueryBuilder('cd')
            ->andWhere('cd.city = :cityId')
            ->setParameter('cityId', $cityId)
            ->orderBy('cd.name');

        if ($searchString) {
            $this->injectSearchQuery($query, $searchString);
        }

        return $query;
    }

    public function save(CityDistrict $cityDistrict): void
    {
        $this->_em->persist($cityDistrict);
        $this->_em->flush();
    }

    private function injectSearchQuery(QueryBuilder $query, string $searchTerm): void
    {
        foreach (explode(' ', $searchTerm) as $key => $word) {
            $query
                ->andWhere('cd.name LIKE :qs'.$key)
                ->setParameter('qs'.$key, '%'.$word.'%')
            ;
        }
    }
}

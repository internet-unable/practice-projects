<?php

namespace App\Repository\Institution;

use App\Entity\Institution\InstitutionUnitType;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\QueryBuilder;
use Doctrine\ORM\Tools\Pagination\Paginator;
use Doctrine\Persistence\ManagerRegistry;

class InstitutionUnitTypeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, InstitutionUnitType::class);
    }

    public function getOneByOldId(int $id): ?InstitutionUnitType
    {
        return $this->createQueryBuilder('it')
            ->andWhere('it.oldId = :id')
            ->setParameter('id', $id)
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function findByCityId(int $cityId, int $cityDistrictId = null): ?array
    {
        $query = $this->findAllQuery(
            filters: ['onlyWithInstitutionUnits' => true, 'cityId' => $cityId, 'cityDistrictId' => $cityDistrictId],
            order: ['field' => 'name', 'direction' => 'ASC'],
        );

        return $query->getQuery()->getResult();
    }

    /**
     * @param string $name
     * @param int $limit
     * @param int|null $offset
     *
     * @return InstitutionUnitType[]
     */
    public function findWithUnitsByName(
        string $name,
        int $limit = 5,
        int $offset = null,
    ): array
    {
        if (empty($name)) {
            return [];
        }

        $query = $this->findAllQuery(
            $name,
            ['onlyWithInstitutionUnits' => true],
            ['field' => 'name', 'direction' => 'ASC'],
        );

        $query->setMaxResults($limit);

        if ($offset) {
            $query->setFirstResult($offset);
        }

        return $query->getQuery()->getResult();
    }

    /**
     * @param string $name
     *
     * @return int
     */
    public function countWithUnitsByName(string $name): int
    {
        if (empty($name)) {
            return 0;
        }

        $query = $this->findAllQuery($name, ['onlyWithInstitutionUnits' => true]);

        return (new Paginator($query))->count();
    }

    public function findAllQuery(?string $searchString = null, array $filters = [], array $order = []): QueryBuilder
    {
        $query = $this->createQueryBuilder('it');

        if ($searchString) {
            $this->injectSearchQuery($query, $searchString);
        }

        if (!empty($filters)) {
            $query->leftJoin('it.units', 'u');

            if ($filters['onlyWithInstitutionUnits'] ?? false) {
                $query->andWhere('u.isPublished = true');
            }

            if (!empty($filters['cityId'])) {
                $query->andWhere('u.city = :cityId');
                $query->setParameter('cityId', $filters['cityId']);
            }

            if (!empty($filters['cityDistrictId'])) {
                $query->andWhere('u.cityDistrict = :cityDistrictId');
                $query->setParameter('cityDistrictId', $filters['cityDistrictId']);
            }
        }

        if ($order) {
            $this->injectOrderBy($query, $order);
        }

        $query->groupBy('it.id');

        return $query;
    }

    public function save(InstitutionUnitType $type): void
    {
        $this->_em->persist($type);
        $this->_em->flush();
    }

    private function injectSearchQuery(QueryBuilder $query, string $searchTerm): void
    {
        foreach (explode(' ', $searchTerm) as $key => $word) {
            $query
                ->andWhere('it.name LIKE :qs'.$key)
                ->setParameter('qs'.$key, '%'.$word.'%')
            ;
        }
    }

    private function injectOrderBy(QueryBuilder $query, array $order = []): void
    {
        $query
            ->addOrderBy('it.'.$order['field'], $order['direction']);
    }
}

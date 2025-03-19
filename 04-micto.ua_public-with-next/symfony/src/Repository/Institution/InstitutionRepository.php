<?php

namespace App\Repository\Institution;

use App\Entity\Institution\Institution;
use App\Entity\UserEntity\UserEntityPermission;
use Doctrine\ORM\QueryBuilder;
use Doctrine\Persistence\ManagerRegistry;

class InstitutionRepository extends AbstractInstitutionRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Institution::class);
    }

    public function getInstitutionsQuery(): QueryBuilder
    {
        return $this->getActiveQuery();
    }

    public function getOneById(int $id): ?Institution
    {
        return $this->getActiveQuery()
            ->andWhere('i.id = :id')
            ->setParameter('id', $id)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function getListByIds(array $ids): array
    {
        return $this->getActiveQuery()
            ->andWhere('i.id in(:ids)')
            ->setParameter('ids', $ids)
            ->getQuery()
            ->getResult();
    }

    /**
     * @return Institution[]
     */
    public function findAllActiveWithSeveralUnits(): array
    {
        return $this->getActiveQuery()
            ->andWhere('i.hasSeveralUnits = true')
            ->getQuery()
            ->getResult();
    }

    public function findByCityId(int $cityId, array $types = []): array
    {
        $query = $this->getActiveQuery()
            ->join('i.units', 'u')
            ->andWhere('u.isPublished = true')
            ->andWhere('u.city = :city')
            ->setParameter('city', $cityId)
            ->orderBy('i.name')
            ->groupBy('i.id')
        ;

        if (!empty($types)) {
            $query->andWhere('u.type IN(:types)')
            ->setParameter('types', $types);
        }

        return $query->getQuery()->getResult();
    }

    public function findByCityDistrictId(int $districtId, array $types = []): array
    {
        $query = $this->getActiveQuery()
            ->join('i.units', 'u')
            ->andWhere('u.isPublished = true')
            ->andWhere('u.cityDistrict = :district')
            ->setParameter('district', $districtId)
            ->orderBy('i.name')
            ->groupBy('i.id')
        ;

        if (!empty($types)) {
            $query->andWhere('u.type IN(:types)')
            ->setParameter('types', $types);
        }

        return $query->getQuery()->getResult();
    }

    /**
     * @param int $userId
     *
     * @return Institution[]
     */
    public function getForUser(int $userId): array
    {
        return $this->createQueryBuilder('i')
            ->distinct()
            ->join(UserEntityPermission::class, 'up', 'WITH', 'i.id = up.institution')
            ->andWhere('up.user = :userId')
            ->setParameter('userId', $userId)
            ->getQuery()
            ->getResult();
    }

    public function save(Institution $institution): void
    {
        $this->_em->persist($institution);
        $this->_em->flush();
    }

    private function getActiveQuery(string $alias = 'i'): QueryBuilder
    {
        return $this->createQueryBuilder($alias)
            ->andWhere("$alias.isPublished = true");
    }
}

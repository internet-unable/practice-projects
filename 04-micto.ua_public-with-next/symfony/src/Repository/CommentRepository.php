<?php

namespace App\Repository;

use App\Entity\Comment;
use App\Entity\Institution\Institution;
use App\Entity\Institution\InstitutionUnit;
use App\Entity\Institution\InstitutionUnitDepartment;
use App\Service\Comment\CommentTypeService;
use DateTimeInterface;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Collections\Order;
use Doctrine\ORM\QueryBuilder;
use Doctrine\ORM\Tools\Pagination\Paginator;
use Doctrine\Persistence\ManagerRegistry;

class CommentRepository extends ServiceEntityRepository
{
    public function __construct(
        ManagerRegistry $registry,
        private readonly CommentTypeService $commentTypeService,
    ){
        parent::__construct($registry, Comment::class);
    }

    public function getById(int $id, bool $published = true): ?Comment
    {
        $q = $this->createQueryBuilder('c')
            ->andWhere('c.id = :id')
            ->setParameter('id', $id);

        if ($published) {
            $q->andWhere('c.isPublished = true');
        }

        return $q->getQuery()->getOneOrNullResult();
    }

    /**
     * @param Institution|InstitutionUnit|InstitutionUnitDepartment|null $entity
     * @param bool $withChildrenUnits
     * @param bool $onlyRootComments
     * @param array $types
     * @param array $filter
     *
     * @return int
     */
    public function countCommentsByParams(
        Institution|InstitutionUnit|InstitutionUnitDepartment $entity = null,
        bool $withChildrenUnits = true,
        bool $onlyRootComments = true,
        array $types = [],
        array $filter = [],
    ): int
    {
        $query = $this->getPublishedCommentsQuery(
            entity: $entity,
            withChildrenUnits: $withChildrenUnits,
            onlyRootComments: $onlyRootComments,
            types: $types,
            filter: $filter,
        );

        return (new Paginator($query))->count();
    }

    /**
     * @param Institution|InstitutionUnit|InstitutionUnitDepartment|null $entity
     * @param bool $withChildrenUnits
     * @param bool $onlyRootComments
     * @param array $types
     * @param array $filter
     * @param int|null $limit
     * @param int|null $offset
     * @param string|null $orderBy
     *
     * @return Comment[]
     */
    public function getCommentsByParams(
        Institution|InstitutionUnit|InstitutionUnitDepartment $entity = null,
        bool $withChildrenUnits = true,
        bool $onlyRootComments = true,
        array $types = [],
        array $filter = [],
        int $limit = null,
        int $offset = null,
        string $orderBy = null,
    ): array
    {
        $query = $this->getPublishedCommentsQuery(
            entity: $entity,
            withChildrenUnits: $withChildrenUnits,
            onlyRootComments: $onlyRootComments,
            types: $types,
            filter: $filter,
        );

        match ($orderBy) {
            '-rating' => $query->orderBy('c.mark', 'DESC'),
            'rating' => $query->orderBy('c.mark', 'ASC'),
            'date' => $query->orderBy('c.createdAt', 'ASC'),
            default => $query->orderBy('c.createdAt', 'DESC'),
        };

        if ($limit) {
            $query->setMaxResults($limit);
        }

        if ($offset) {
            $query->setFirstResult($offset);
        }

        return $query->getQuery()->getResult();
    }

    /**
     * @param Institution|InstitutionUnit|InstitutionUnitDepartment|null $entity
     * @param bool $withChildrenUnits
     * @param bool $onlyRootComments
     * @param array $types
     * @param array $filter
     *
     * @return QueryBuilder
     */
    public function getPublishedCommentsQuery(
        Institution|InstitutionUnit|InstitutionUnitDepartment $entity = null,
        bool $withChildrenUnits = true,
        bool $onlyRootComments = true,
        array $types = [],
        array $filter = [],
    ): QueryBuilder
    {
        $query = $this->createQueryBuilder('c')
            ->andWhere('c.isPublished = true')
        ;

        if ($entity) {
            $entityType = $this->commentTypeService->getEntityType($entity);

            $query
                ->andWhere(sprintf('c.%s = :entityId', $entityType))
                ->setParameter(':entityId', $entity->getId())
            ;

            if (!$withChildrenUnits) {
                $query
                    ->andWhere('c.entityType = :entityType')
                    ->setParameter(':entityType', $entityType)
                ;
            }
        }

        if ($onlyRootComments) {
            $query->andWhere('c.rootItem IS NULL');
        }

        if (!empty($types)) {
            $query
                ->andWhere('c.type IN(:types)')
                ->setParameter(':types', $types)
            ;
        }

        if (!empty($filter['unit'])) {
            $query
                ->andWhere('c.institutionUnit = :unitId')
                ->setParameter(':unitId', $filter['unit'])
            ;
        }
        elseif (!empty($filter['city_district'])) {
            $query
                ->join('c.institutionUnit', 'u')
                ->andWhere('u.cityDistrict = :cityDistrictId')
                ->setParameter(':cityDistrictId', $filter['city_district'])
            ;
        }
        elseif (!empty($filter['city'])) {
            $query
                ->join('c.institutionUnit', 'u')
                ->andWhere('u.city = :cityId')
                ->setParameter(':cityId', $filter['city'])
            ;
        }
        elseif (!empty($filter['district'])) {
            $query
                ->join('c.institutionUnit', 'u')
                ->join('u.city', 'city')
                ->andWhere('city.district = :districtId')
                ->setParameter(':districtId', $filter['district'])
            ;
        }
        elseif (!empty($filter['area'])) {
            $query
                ->join('c.institutionUnit', 'u')
                ->join('u.city', 'city')
                ->andWhere('city.area = :areaId')
                ->setParameter(':areaId', $filter['area'])
            ;
        }

        if ($filter['onlyWithMark'] ?? null) {
            $query
                ->andWhere('c.mark IS NOT NULL AND c.mark > 0')
            ;
        }

        if (!empty($filter['dateFrom']) && $filter['dateFrom'] instanceof DateTimeInterface) {
            $query
                ->andWhere('c.createdAt >= :dateFrom')
                ->setParameter('dateFrom', $filter['dateFrom'])
            ;
        }

        if (!empty($filter['dateTo']) && $filter['dateFrom'] instanceof DateTimeInterface) {
            $query
                ->andWhere('c.createdAt <= :dateTo')
                ->setParameter('dateTo', $filter['dateTo'])
            ;
        }

        if (!empty($filter['unitDepartment']) && is_array($filter['unitDepartment'])) {
            $query
                ->andWhere('c.institutionUnitDepartment IN(:unitDepartmentIds)')
                ->setParameter('unitDepartmentIds', $filter['unitDepartment'])
            ;
        }

        return $query;
    }

    public function injectOrderByToPublishedCommentsQuery(
        QueryBuilder $query,
        ?string $field = null,
        ?string $direction = null,
        ?int $userId = null,
    ): void
    {
        $field = $field ? strtoupper($field) : null;
        $direction = strtoupper($direction) == 'ASC' ? 'ASC' : 'DESC';

        if ('ANSWERED' == $field) {
            $query
                ->addGroupBy('c.id')
                ->leftJoin('c.childItems', 'ci', 'WITH', 'ci.user = :userId')
                ->setParameter('userId', $userId)
                ->orderBy('IF(ci.id IS NULL, 1, 0)', $direction)
                ->addOrderBy('c.createdAt', 'DESC')
            ;
        } elseif ('DATE' == $field) {
            $query->orderBy('c.createdAt', $direction);
        } else {
            $query->orderBy('c.createdAt', 'DESC');
        }
    }

    /**
     * @param int $commentId
     *
     * @return int
     */
    public function countCommentReplies(int $commentId): int
    {
        return (new Paginator(
            $this->getRepliesQuery([$commentId])
        ))->count();
    }

    /**
     * @param int $commentId
     * @param int|null $limit
     * @param int|null $offset
     *
     * @return Comment[]
     */
    public function getCommentReplies(
        int $commentId,
        int $limit = null,
        int $offset = null,
    ): array
    {
        $query = $this->getRepliesQuery([$commentId])
            ->orderBy('c.createdAt', 'ASC')
        ;

        if ($limit) {
            $query->setMaxResults($limit);
        }

        if ($offset) {
            $query->setFirstResult($offset);
        }

        return $query->getQuery()->getResult();
    }

    /**
     * @param array $rootIds
     *
     * @return QueryBuilder
     */
    public function getRepliesQuery(array $rootIds): QueryBuilder
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.rootItem IN (:rootIds)')
            ->andWhere('c.isPublished = true')
            ->setParameter('rootIds', $rootIds)
        ;
    }

    /**
     * @deprecated
     */
    public function getRootCommentsQuery(string $entityType = null, int $entityId = null): QueryBuilder
    {
        $q = $this->createQueryBuilder('c')
            ->andWhere('c.rootItem IS NULL')
            ->andWhere('c.isPublished = true')
            ->orderBy('c.id', Order::Descending->value);

        if ($entityType && $entityId) {
            $this->commentTypeService->checkEntityType($entityType);
            $this->injectEntityType($q, $entityType, $entityId);
        }

        return $q;
    }

    public function getUserCommentsQuery(int $userId): QueryBuilder
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.user = :userId')
            ->setParameter('userId', $userId)
            ->andWhere('c.rootItem IS NULL');
    }

    public function save(Comment $comment)
    {
        $this->_em->persist($comment);
        $this->_em->flush();
    }

    /**
     * @deprecated
     */
    private function injectEntityType(QueryBuilder $query, string $entityType, int $entityId): void
    {
        $query
            ->andWhere("c.$entityType = :id")
            ->andWhere('c.entityType = :type')
            ->setParameter('type', $entityType)
            ->setParameter('id', $entityId);
    }
}

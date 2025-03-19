<?php

namespace App\Repository\Notification;

use App\Entity\Notification\UserNotification;
use DateTimeInterface;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\QueryBuilder;
use Doctrine\Persistence\ManagerRegistry;

class UserNotificationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, UserNotification::class);
    }

    public function getUserNotificationsQuery(int $userId, array $filter = []): QueryBuilder
    {
        $query = $this->createQueryBuilder('un')
            ->andWhere('un.user = :userId')
            ->setParameter('userId', $userId);

        if ($filter['onlyUnread'] ?? false) {
            $query->andWhere('un.isRead = false');
        }

        if (!empty($filter['dateFrom']) && $filter['dateFrom'] instanceof DateTimeInterface) {
            $query
                ->andWhere('un.createdAt >= :dateFrom')
                ->setParameter('dateFrom', $filter['dateFrom'])
            ;
        }

        if (!empty($filter['dateTo']) && $filter['dateFrom'] instanceof DateTimeInterface) {
            $query
                ->andWhere('un.createdAt <= :dateTo')
                ->setParameter('dateTo', $filter['dateTo'])
            ;
        }

        return $query;
    }

    public function markAsRead(array $ids, int $userId): void
    {
        if (empty($ids)) {
            return;
        }

        $this->createQueryBuilder('un')
            ->update()
            ->set('un.isRead', true)
            ->where('un.user = :userId')
            ->setParameter('userId', $userId)
            ->andWhere('un.id IN (:ids)')
            ->setParameter('ids', $ids)
            ->getQuery()
            ->execute()
        ;
    }

    public function save(UserNotification $media): void
    {
        $this->_em->persist($media);
        $this->_em->flush();
    }
}

<?php

namespace App\Repository\Notification;

use App\Entity\Notification\Notification;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class NotificationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Notification::class);
    }

    public function removeRecordsOlderThan(\DateTime $date): int
    {
        return (int)$this->createQueryBuilder('n')
            ->delete()
            ->where('n.createdAt <= :date')
            ->setParameter('date', $date)
            ->getQuery()
            ->execute();
    }

    /**
     * @param int $limit
     *
     * @return Notification[]
     */
    public function getNotSentNotifications(int $limit = 20): array
    {
        return $this->createQueryBuilder('n')
            ->andWhere('n.isSent = 0')
            ->getQuery()
            ->setMaxResults($limit)
            ->getResult();
    }

    public function save(Notification $notification): void
    {
        $this->_em->persist($notification);
        $this->_em->flush();
    }

    public function remove(Notification $notification): void
    {
        $this->_em->remove($notification);
        $this->_em->flush();
    }
}

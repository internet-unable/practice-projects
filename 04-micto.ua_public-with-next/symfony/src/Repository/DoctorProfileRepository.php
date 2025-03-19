<?php

namespace App\Repository;

use App\Entity\UserProfile\DoctorProfile;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class DoctorProfileRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, DoctorProfile::class);
    }

    public function getByUserId(int $userId): ?DoctorProfile
    {
        return $this->createQueryBuilder('dp')
            ->andWhere('dp.user = :userId')
            ->setParameter('userId', $userId)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function save(DoctorProfile $entity, bool $flush = true): void
    {
        $this->_em->persist($entity);

        if ($flush) {
            $this->_em->flush();
        }
    }
}

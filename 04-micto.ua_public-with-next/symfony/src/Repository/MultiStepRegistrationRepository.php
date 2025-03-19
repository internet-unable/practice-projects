<?php

namespace App\Repository;

use App\Entity\MultiStepRegistration;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class MultiStepRegistrationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, MultiStepRegistration::class);
    }

    public function getOneByToken(string $token): ?MultiStepRegistration
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.token = :token')
            ->setParameter('token', $token)
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function create(): MultiStepRegistration
    {
        $entity = new MultiStepRegistration();

        $token = sprintf('%s:%s', (new \DateTime())->getTimestamp(), rand(0, 100));

        $entity->setToken(
            hash('sha1', $token)
        );

        $this->save($entity);

        return $entity;
    }

    public function setStepData(MultiStepRegistration $entity, int $step, array $data): MultiStepRegistration
    {
        $registrationData = $entity->getData();
        $registrationData[$step] = $data;

        $entity->setData($registrationData);

        $this->save($entity);

        return $entity;
    }

    public function save(MultiStepRegistration $entity, bool $flush = true): void
    {
        $this->_em->persist($entity);

        if ($flush) {
            $this->_em->flush();
        }
    }

    public function remove(MultiStepRegistration $entity): void
    {
        $this->_em->remove($entity);
        $this->_em->flush();
    }

    public function removeOldData(): int
    {
        return (int)$this->createQueryBuilder('r')
            ->delete()
            ->where('r.createdAt <= :date')
            ->setParameter('date', (new \DateTime('-1 day')))
            ->getQuery()
            ->execute();
    }
}

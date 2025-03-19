<?php

namespace App\Repository;

use App\Entity\Media\Media;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class MediaRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Media::class);
    }

    /**
     * @param int $entityId
     * @param string $entityType
     * @param string $mediaType
     *
     * @return Media[]
     */
    public function getForEntityByType(
        int $entityId,
        string $entityType,
        string $mediaType,
    ): array
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.entityType = :entityType')
            ->andWhere('m.entityId = :entityId')
            ->andWhere('m.type = :type')
            ->setParameter('entityType', $entityType)
            ->setParameter('entityId', $entityId)
            ->setParameter('type', $mediaType)
            ->orderBy('m.displayOrder')
            ->getQuery()
            ->getResult();
    }

    public function save(Media $media): void
    {
        $this->_em->persist($media);
        $this->_em->flush();
    }

    public function remove(Media $media): void
    {
        $this->_em->remove($media);
        $this->_em->flush();
    }
}

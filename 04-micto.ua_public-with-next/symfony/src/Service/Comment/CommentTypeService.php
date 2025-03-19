<?php

namespace App\Service\Comment;

use App\Entity\Comment;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;

class CommentTypeService
{
    public function __construct(
        private readonly EntityManagerInterface $em,
    ){}

    /**
     * @throws CommentServiceException
     */
    public function checkEntityType(string $entityType): void
    {
        if (!in_array($entityType, array_keys(Comment::ENTITY_TYPES))) {
            throw new CommentServiceException('Unknown Entity type: '.$entityType);
        }
    }

    /**
     * @throws CommentServiceException
     */
    public function getEntityRepo(string $entityType): EntityRepository
    {
        $this->checkEntityType($entityType);

        if (!$repo = $this->em->getRepository(Comment::ENTITY_TYPES[$entityType])) {
            throw new CommentServiceException('Repository not found for entity: '.$entityType);
        }

        return $repo;
    }

    /**
     * @throws CommentServiceException
     */
    public function getEntity(string $entityType, int $entityId): mixed
    {
        $entity = $this->getEntityRepo($entityType)->findOneBy([
            'id' => $entityId,
        ]) ?? $this->getEntityRepo($entityType)->findOneBy([
            'oldId' => $entityId,
        ]);

        if (!$entity) {
            throw new CommentServiceException("Entity '$entityType' with id '$entityId' not found");
        }

        return $entity;
    }

    public function getEntityType(object $entity): string
    {
        return (new Comment())->setEntity($entity)->getEntityType();
    }
}

<?php

namespace App\Repository\Institution;

use App\Entity\UserEntity\UserEntityInterface;
use Doctrine\Persistence\ObjectRepository;

interface UserEntityRepository extends ObjectRepository
{
    public function getOneById(int $id): ?UserEntityInterface;

    /**
     * @param Int[]
     * @return UserEntityInterface[]
     */
    public function getListByIds(array $ids): array;
}

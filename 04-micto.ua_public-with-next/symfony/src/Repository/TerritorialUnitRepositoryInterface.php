<?php

namespace App\Repository;

interface TerritorialUnitRepositoryInterface
{
    /**
     * @param int $id
     *
     * @return null|mixed
     */
    public function getOneByOldId(int $id);
}
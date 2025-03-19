<?php

namespace App\Service\Paginator;

use Doctrine\ORM\QueryBuilder;
use Doctrine\ORM\Tools\Pagination\Paginator;

class PaginatorService
{
    public function getItemsWithPagination(QueryBuilder $query, int $limit = 10, int $page = 1): ItemsWithPagination
    {
        $query
            ->setFirstResult(($page - 1) * $limit)
            ->setMaxResults($limit);

        $paginator = new Paginator($query);
        $totalItems = $paginator->count();
        $totalPages = ceil($totalItems / $limit);


        return new ItemsWithPagination(
            iterator_to_array($paginator),
            new PaginationInfo($limit, $page, $totalPages, $totalItems),
        );
    }
}

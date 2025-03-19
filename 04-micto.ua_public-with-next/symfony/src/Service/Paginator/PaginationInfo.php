<?php

namespace App\Service\Paginator;

class PaginationInfo
{
    private int $limit = 10;
    private int $page = 1;
    private int $totalPages = 0;
    private int $totalItems = 0;

    public function __construct(
        int $limit = 10,
        int $page = 1,
        int $totalPages = 0,
        int $totalItems = 0,
    ) {

        $this->limit = $limit;
        $this->page = $page;
        $this->totalPages = $totalPages;
        $this->totalItems = $totalItems;
    }

    public function getLimit(): int
    {
        return $this->limit;
    }

    public function getPage(): int
    {
        return $this->page;
    }

    public function getTotalPages(): int
    {
        return $this->totalPages;
    }

    public function getTotalItems(): int
    {
        return $this->totalItems;
    }
}

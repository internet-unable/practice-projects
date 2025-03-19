<?php

namespace App\Service\Paginator;

class ItemsWithPagination
{
    private array $items;
    private PaginationInfo $paginationInfo;

    public function __construct(array $items, PaginationInfo $paginationInfo)
    {
        $this->items = $items;
        $this->paginationInfo = $paginationInfo;
    }

    public function getItems(): array
    {
        return $this->items;
    }

    public function setItems(array $items): self
    {
        $this->items = $items;
        return $this;
    }

    public function getPaginationInfo(): PaginationInfo
    {
        return $this->paginationInfo;
    }

    public function setPaginationInfo(PaginationInfo $paginationInfo): self
    {
        $this->paginationInfo = $paginationInfo;
        return $this;
    }

}

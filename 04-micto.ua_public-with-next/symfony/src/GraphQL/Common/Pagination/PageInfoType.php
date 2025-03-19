<?php

namespace App\GraphQL\Common\Pagination;

use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\Type;

#[Type]
class PageInfoType
{
    const DEFAULT_LIMIT = 10;

    public function __construct(
        private int $page = 0,
        private int $limit = 0,
        private int $totalPages = 0,
        private int $totalItems = 0,
    ){
        $this->setPage($page);
        $this->setLimit($limit);
    }

    #[Field]
    public function getPage(): int
    {
        return $this->page;
    }

    #[Field]
    public function getLimit(): int
    {
        return $this->limit;
    }

    #[Field]
    public function getTotalPages(): int
    {
        return $this->totalPages;
    }

    #[Field]
    public function getTotalItems(): int
    {
        return $this->totalItems;
    }

    public function setPage(int $page): self
    {
        if ($page <= 0) {
            $page = 1;
        }

        $this->page = $page;

        return $this;
    }

    public function setLimit(int $limit): self
    {
        if ($limit <= 0) {
            $limit = self::DEFAULT_LIMIT;
        }

        $this->limit = $limit;

        return $this;
    }

    public function setTotalPages(int $totalPages): self
    {
        $this->totalPages = $totalPages;

        return $this;
    }

    public function setTotalItems(int $totalItems): self
    {
        $this->totalItems = $totalItems;

        return $this;
    }
}

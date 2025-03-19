<?php

namespace App\GraphQL\Common\Pagination;

interface ItemListInterface
{
    public function getItems(): array;
    public function getPageInfo(): PageInfoType;
}

<?php

namespace App\GraphQL\Common\Pagination;

use Doctrine\ORM\Query;
use Doctrine\ORM\QueryBuilder;
use Doctrine\ORM\Tools\Pagination\Paginator;

abstract class AbstractItemList implements ItemListInterface
{
    private Query $query;
    private PageInfoType $pageInfo;
    private ?array $result = null;

    public function __construct(
        QueryBuilder|Query $query,
        ?PaginationInput $paginationInput,
    )
    {
        if ($query instanceof QueryBuilder) {
            $query = $query->getQuery();
        }

        $this->query = $query;

        $this->pageInfo = new PageInfoType(
            page: $paginationInput?->page ?: 1,
            limit: $paginationInput?->limit ?: 10,
        );
    }

    public function getItems(): array
    {
        if ($this->result !== null) {
            return $this->result;
        }

        $query = clone $this->query;
        $query->setParameters($this->query->getParameters());

        $query
            ->setFirstResult(
                ($this->pageInfo->getPage() - 1) * $this->pageInfo->getLimit()
            )
            ->setMaxResults($this->pageInfo->getLimit());

        return $query->getResult();
    }

    public function getPageInfo(): PageInfoType
    {
        $paginator = new Paginator($this->query);
        $this->pageInfo->setTotalItems($paginator->count());
        $this->pageInfo->setTotalPages(
            ceil($this->pageInfo->getTotalItems() / $this->pageInfo->getLimit())
        );

        return $this->pageInfo;
    }
}

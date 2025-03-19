<?php

namespace App\GraphQL\InstitutionUnitType\Query;

use App\Entity\Institution\InstitutionUnitType;
use App\GraphQL\Common\Order\OrderTransformer;
use App\GraphQL\Common\Pagination\PaginationInput;
use App\GraphQL\InstitutionUnitType\Input\InstitutionUnitTypeFilter;
use App\GraphQL\InstitutionUnitType\Input\InstitutionUnitTypeOrder;
use App\GraphQL\InstitutionUnitType\Type\InstitutionUnitTypeList;
use App\Repository\Institution\InstitutionUnitTypeRepository;
use TheCodingMachine\GraphQLite\Annotations\Cost;
use TheCodingMachine\GraphQLite\Annotations\Query;

class InstitutionUnitTypeQuery
{
    public function __construct(
        private readonly InstitutionUnitTypeRepository $unitTypeRepo,
        private readonly OrderTransformer $orderTransformer,
    ){}

    #[Query]
    #[Cost(complexity: 30)]
    public function institutionUnitTypes(
        ?string $searchString = null,
        ?InstitutionUnitTypeFilter $filter = null,
        ?PaginationInput $pagination = null,
        ?InstitutionUnitTypeOrder $order = null,
    ): InstitutionUnitTypeList
    {
        $searchString = trim($searchString);
        $order = $order ? $this->orderTransformer->inputToArray($order) : [];
        $query = $this->unitTypeRepo->findAllQuery(
            $searchString,
            $filter?->toArray() ?? [],
            $order
        );

        return new InstitutionUnitTypeList($query, $pagination);
    }

    #[Query]
    #[Cost(complexity: 10)]
    public function institutionUnitType(
        ?int $id = null,
        ?int $oldId = null,
    ): ?InstitutionUnitType
    {
        if (!$id && !$oldId) {
            return null;
        }

        if ($id) {
            return $this->unitTypeRepo->find($id);
        }

        return $this->unitTypeRepo->getOneByOldId($oldId);
    }
}

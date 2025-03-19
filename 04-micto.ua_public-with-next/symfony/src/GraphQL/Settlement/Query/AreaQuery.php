<?php

namespace App\GraphQL\Settlement\Query;

use App\Entity\Area;
use App\GraphQL\Common\Pagination\PaginationInput;
use App\GraphQL\Settlement\Input\AreaFilterInput;
use App\GraphQL\Settlement\Type\AreaList;
use App\Repository\AreaRepository;
use TheCodingMachine\GraphQLite\Annotations\Cost;
use TheCodingMachine\GraphQLite\Annotations\Query;

class AreaQuery
{
    public function __construct(
        private readonly AreaRepository $areaRepo,
    ){}

    #[Query]
    public function areas(
        ?string $searchString = null,
        bool $onlyWithInstitutionUnits = false,
        ?AreaFilterInput $filter = null,
        ?PaginationInput $pagination = null,
    ): AreaList
    {
        $query = $onlyWithInstitutionUnits || $filter?->unitTypeId ?
            $this->areaRepo->allWithUnitsByParamsQuery(unitTypeId: $filter?->unitTypeId, name: $searchString) :
            $this->areaRepo->getListQuery($searchString);

        return new AreaList($query, $pagination);
    }

    #[Query]
    #[Cost(complexity: 10)]
    public function area(
        ?int $id = null,
        ?int $oldId = null,
    ): ?Area
    {
        if (!$id && !$oldId) {
            return null;
        }

        if ($id) {
            return $this->areaRepo->getOneById($id);
        }

        return $this->areaRepo->getOneByOldId($oldId);
    }
}

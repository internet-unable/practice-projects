<?php

namespace App\GraphQL\Settlement\Query;

use App\Entity\District;
use App\GraphQL\Common\Pagination\PaginationInput;
use App\GraphQL\Settlement\Input\DistrictFilterInput;
use App\GraphQL\Settlement\Type\DistrictList;
use App\Repository\DistrictRepository;
use TheCodingMachine\GraphQLite\Annotations\Cost;
use TheCodingMachine\GraphQLite\Annotations\Query;

class DistrictQuery
{
    public function __construct(
        private readonly DistrictRepository $districtRepo,
    ){}

    #[Query]
    #[Cost(complexity: 50)]
    public function districts(
        int $areaId,
        ?string $searchString = null,
        bool $onlyWithInstitutionUnits = false,
        ?DistrictFilterInput $filter = null,
        ?PaginationInput $pagination = null,
    ): DistrictList
    {
        $searchString = trim($searchString);
        $query = $onlyWithInstitutionUnits || $filter?->unitTypeId ?
            $this->districtRepo->allWithUnitsByParamsQuery(
                areaId: $areaId,
                unitTypeId: $filter?->unitTypeId,
                name: $searchString
            ) :
            $this->districtRepo->findByAreaIdQuery($areaId, $searchString);

        return new DistrictList($query, $pagination);
    }

    #[Query]
    #[Cost(complexity: 10)]
    public function getDistrict(
        ?int $id = null,
        ?int $oldId = null,
    ): ?District
    {
        if (!$id && !$oldId) {
            return null;
        }

        if ($id) {
            return $this->districtRepo->getOneById($id);
        }

        return $this->districtRepo->getOneByOldId($oldId);
    }
}

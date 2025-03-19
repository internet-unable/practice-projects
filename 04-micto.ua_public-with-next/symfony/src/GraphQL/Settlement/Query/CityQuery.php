<?php

namespace App\GraphQL\Settlement\Query;

use App\Entity\City;
use App\Entity\CityType;
use App\GraphQL\Common\Pagination\PaginationInput;
use App\GraphQL\Settlement\Input\CityFilterInput;
use App\GraphQL\Settlement\Type\CityList;
use App\Repository\CityRepository;
use TheCodingMachine\GraphQLite\Annotations\Cost;
use TheCodingMachine\GraphQLite\Annotations\Query;
use TheCodingMachine\GraphQLite\Exceptions\GraphQLException;

class CityQuery
{
    public function __construct(
        private readonly CityRepository $cityRepo,
    ){}

    #[Query]
    #[Cost(complexity: 50)]
    public function cities(
        ?int $districtId = null,
        ?string $searchString = null,
        bool $onlyWithInstitutionUnits = false,
        ?CityFilterInput $filter = null,
        ?PaginationInput $pagination = null,
    ): CityList
    {
        $searchString = trim($searchString);

        if (
            $onlyWithInstitutionUnits
            || $filter?->unitTypeId
            || $filter?->areaId
            || $filter?->onlyCities
        ) {
            $query =$this->cityRepo->allWithUnitsByParamsQuery(
                areaId: $filter?->areaId,
                unitTypeId: $filter?->unitTypeId,
                districtId: $districtId,
                name: $searchString,
                cityTypes: $filter?->onlyCities ? [
                    CityType::SPECIAL,
                    CityType::CITY,
                ] : [],
            );
        } elseif ($districtId) {
            $query = $this->cityRepo->findByDistrictIdQuery($districtId, $searchString);
        } else {
            throw new GraphQLException('District id not provided', 400);
        }

        return new CityList($query, $pagination);
    }

    #[Query]
    #[Cost(complexity: 50)]
    public function getAreaCenters(
        bool $onlyWithInstitutionUnits = false,
        ?PaginationInput $pagination = null,
    ): CityList
    {
        $query = $this->cityRepo->findAreaCentersQuery();

        return new CityList($query, $pagination);
    }

    #[Query]
    #[Cost(complexity: 10)]
    public function getCity(
        ?int $id = null,
        ?int $oldId = null,
    ): ?City
    {
        if (!$id && !$oldId) {
            return null;
        }

        if ($id) {
            return $this->cityRepo->findOneById($id);
        }

        return $this->cityRepo->getOneByOldId($oldId);
    }
}

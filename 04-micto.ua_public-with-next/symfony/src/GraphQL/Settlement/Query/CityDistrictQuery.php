<?php

namespace App\GraphQL\Settlement\Query;

use App\Entity\CityDistrict;
use App\GraphQL\Common\Pagination\PaginationInput;
use App\GraphQL\Settlement\Type\CityDistrictList;
use App\Repository\CityDistrictRepository;
use TheCodingMachine\GraphQLite\Annotations\Cost;
use TheCodingMachine\GraphQLite\Annotations\Query;

class CityDistrictQuery
{
    public function __construct(
        private readonly CityDistrictRepository $cityDistrictRepo,
    ){}

    #[Query]
    #[Cost(complexity: 60)]
    public function cityDistricts(
        int $cityId,
        ?string $searchString = null,
        bool $onlyWithInstitutionUnits = false,
        ?PaginationInput $pagination = null,
    ): CityDistrictList
    {
        $query = $onlyWithInstitutionUnits ?
            $this->cityDistrictRepo->allWithUnitsByParamsQuery(cityId: $cityId, name: $searchString) :
            $this->cityDistrictRepo->findByCityIdQuery($cityId, $searchString);

        return new CityDistrictList($query, $pagination);
    }

    #[Query]
    #[Cost(complexity: 10)]
    public function getCityDistrict(
        ?int $id = null,
        ?int $oldId = null,
    ): ?CityDistrict
    {
        if (!$id && !$oldId) {
            return null;
        }

        if ($id) {
            return $this->cityDistrictRepo->findOneById($id);
        }

        return $this->cityDistrictRepo->getOneByOldId($oldId);
    }
}

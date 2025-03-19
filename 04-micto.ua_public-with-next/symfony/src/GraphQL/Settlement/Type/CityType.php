<?php

namespace App\GraphQL\Settlement\Type;

use App\Entity\City;
use App\GraphQL\Common\Pagination\PaginationInput;
use App\Repository\CityDistrictRepository;
use App\Repository\Institution\InstitutionUnitRepository;
use App\Service\TerritorialUnitNameFormatter;
use TheCodingMachine\GraphQLite\Annotations\Cost;
use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\SourceField;
use TheCodingMachine\GraphQLite\Annotations\Type;

#[Type(class: City::class, name: 'City')]
#[SourceField(name: 'id')]
#[SourceField(name: 'name')]
#[SourceField(name: 'slug')]
#[SourceField(name: 'areaCenter')]
#[SourceField(name: 'katottg')]
#[SourceField(name: 'type')]
#[SourceField(name: 'oldId')]

#[SourceField(name: 'area')]
#[SourceField(name: 'district')]
#[SourceField(name: 'otg')]
class CityType
{
    public function __construct(
        private readonly CityDistrictRepository $cityDistrictRepo,
        private readonly InstitutionUnitRepository $unitRepository,
        private readonly TerritorialUnitNameFormatter $nameFormatter,
    ){}

    #[Field(outputType: 'String', description: 'Short name of the city')]
    #[Cost(complexity: 1)]
    public function getShortName(City $city): string
    {
        return $this->nameFormatter->getName($city);
    }

    #[Field(outputType: 'String', description: 'Full name of the city')]
    #[Cost(complexity: 1)]
    public function getFullName(City $city): string
    {
        return $this->nameFormatter->getName($city, true);
    }

    #[Field(outputType: 'Int!', description: 'The number of institution units in the city')]
    #[Cost(complexity: 30)]
    public function getNumberOfInstitutionUnits(City $city): int
    {
        return $this->unitRepository->countAllByParams(cityIds: [$city->getId()]);
    }

    #[Field(description: 'The city districts')]
    #[Cost(complexity: 60)]
    public function getCityDistricts(
        City $city,
        bool $onlyWithInstitutionUnits = false,
        ?PaginationInput $pagination = null,
    ): CityDistrictList
    {
        $query = $onlyWithInstitutionUnits ?
            $this->cityDistrictRepo->allWithUnitsByParamsQuery(cityId: $city->getId()) :
            $this->cityDistrictRepo->findByCityIdQuery($city->getId());

        return new CityDistrictList($query, $pagination);
    }
}

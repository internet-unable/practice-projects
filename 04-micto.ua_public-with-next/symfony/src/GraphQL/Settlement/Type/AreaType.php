<?php

namespace App\GraphQL\Settlement\Type;

use App\Entity\Area;
use App\GraphQL\Common\Pagination\PaginationInput;
use App\Repository\CityRepository;
use App\Repository\DistrictRepository;
use App\Repository\Institution\InstitutionUnitRepository;
use App\Service\TerritorialUnitNameFormatter;
use TheCodingMachine\GraphQLite\Annotations\Cost;
use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\SourceField;
use TheCodingMachine\GraphQLite\Annotations\Type;

#[Type(class: Area::class, name: 'Area')]
#[SourceField(name: 'id')]
#[SourceField(name: 'name')]
#[SourceField(name: 'slug')]
#[SourceField(name: 'katottg')]
#[SourceField(name: 'oldId')]
#[SourceField(name: 'isPublished')]
class AreaType
{
    public function __construct(
        private readonly DistrictRepository $districtRepository,
        private readonly CityRepository $cityRepository,
        private readonly InstitutionUnitRepository $unitRepository,
        private readonly TerritorialUnitNameFormatter $nameFormatter,
    ) {}

    #[Field(outputType: 'String', description: 'Short name of the area')]
    #[Cost(complexity: 1)]
    public function getShortName(Area $area): string
    {
        return $this->nameFormatter->getName($area);
    }

    #[Field(outputType: 'String', description: 'Full name of the area')]
    #[Cost(complexity: 1)]
    public function getFullName(Area $area): string
    {
        return $this->nameFormatter->getName($area, true);
    }

    #[Field(outputType: 'Int!', description: 'The number of institution units in the area')]
    #[Cost(complexity: 30)]
    public function getNumberOfInstitutionUnits(Area $area): int
    {
        return $this->unitRepository->countAllByParams(areaId: $area->getId());
    }

    /**
     * @deprecated Temporary and will be removed
     */
    #[Field(outputType: '[City]', description: 'Area cities with institution units')]
    #[Cost(complexity: 50)]
    public function getCitiesWithInstitutionUnits(Area $area): array
    {
        return $this->cityRepository->findWithUnitsByParams(areaId: $area->getId());
    }

    #[Field(description: 'Area districts')]
    #[Cost(complexity: 50)]
    public function getDistricts(
        Area $area,
        bool $onlyWithInstitutionUnits = false,
        ?PaginationInput $pagination = null,
    ): DistrictList
    {

        $query = $onlyWithInstitutionUnits ?
            $this->districtRepository->allWithUnitsByParamsQuery(areaId: $area->getId()) :
            $this->districtRepository->findByAreaIdQuery($area->getId());

        return new DistrictList($query, $pagination);
    }
}

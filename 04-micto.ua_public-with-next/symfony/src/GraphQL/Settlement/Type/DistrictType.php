<?php

namespace App\GraphQL\Settlement\Type;

use App\Entity\District;
use App\GraphQL\Common\Pagination\PaginationInput;
use App\Repository\CityRepository;
use App\Repository\Institution\InstitutionUnitRepository;
use App\Service\TerritorialUnitNameFormatter;
use TheCodingMachine\GraphQLite\Annotations\Cost;
use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\SourceField;
use TheCodingMachine\GraphQLite\Annotations\Type;

#[Type(class: District::class, name: 'District')]
#[SourceField(name: 'id')]
#[SourceField(name: 'name')]
#[SourceField(name: 'slug')]
#[SourceField(name: 'katottg')]
#[SourceField(name: 'oldId')]

#[SourceField(name: 'area')]
class DistrictType
{
    public function __construct(
        private readonly CityRepository $cityRepo,
        private readonly InstitutionUnitRepository $unitRepository,
        private readonly TerritorialUnitNameFormatter $nameFormatter,
    ){}

    #[Field(outputType: 'String', description: 'Short name of the district')]
    #[Cost(complexity: 1)]
    public function getShortName(District $district): string
    {
        return $this->nameFormatter->getName($district);
    }

    #[Field(outputType: 'String', description: 'Full name of the district')]
    #[Cost(complexity: 1)]
    public function getFullName(District $district): string
    {
        return $this->nameFormatter->getName($district, true);
    }

    #[Field(outputType: 'Int!', description: 'The number of institution units in the area district')]
    #[Cost(complexity: 30)]
    public function getNumberOfInstitutionUnits(District $district): int
    {
        return $this->unitRepository->countAllByParams(districtIds: [$district->getId()]);
    }

    #[Field(description: 'District cities')]
    #[Cost(complexity: 50)]
    public function getCities(
        District $district,
        bool $onlyWithInstitutionUnits = false,
        ?PaginationInput $pagination = null,
    ): CityList
    {
        $query = $onlyWithInstitutionUnits ?
            $this->cityRepo->allWithUnitsByParamsQuery(districtId: $district->getId()) :
            $this->cityRepo->findByDistrictIdQuery($district->getId());

        return new CityList($query, $pagination);
    }
}

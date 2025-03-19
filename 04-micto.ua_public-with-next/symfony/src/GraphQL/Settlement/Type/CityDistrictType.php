<?php

namespace App\GraphQL\Settlement\Type;

use App\Entity\CityDistrict;
use App\Repository\Institution\InstitutionUnitRepository;
use App\Service\TerritorialUnitNameFormatter;
use TheCodingMachine\GraphQLite\Annotations\Cost;
use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\SourceField;
use TheCodingMachine\GraphQLite\Annotations\Type;

#[Type(class: CityDistrict::class, name: 'CityDistrict')]
#[SourceField(name: 'id')]
#[SourceField(name: 'name')]
#[SourceField(name: 'slug')]
#[SourceField(name: 'oldId')]

#[SourceField(name: 'city')]
class CityDistrictType
{
    public function __construct(
        private readonly InstitutionUnitRepository $unitRepository,
        private readonly TerritorialUnitNameFormatter $nameFormatter,
    ){}

    #[Field(outputType: 'String', description: 'Short name of the city district')]
    #[Cost(complexity: 1)]
    public function getShortName(CityDistrict $cityDistrict): string
    {
        return $this->nameFormatter->getName($cityDistrict);
    }

    #[Field(outputType: 'String', description: 'Full name of the city district')]
    #[Cost(complexity: 1)]
    public function getFullName(CityDistrict $cityDistrict): string
    {
        return $this->nameFormatter->getName($cityDistrict, true);
    }

    #[Field(outputType: 'Int!', description: 'The number of institution units in the city district')]
    #[Cost(complexity: 40)]
    public function getNumberOfInstitutionUnits(CityDistrict $cityDistrict): int
    {
        return $this->unitRepository->countAllByParams(cityDistrictIds: [$cityDistrict->getId()]);
    }
}

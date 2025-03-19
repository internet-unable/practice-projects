<?php

namespace App\GraphQL\InstitutionUnitType\Type;

use App\Entity\Institution\InstitutionUnitType;
use App\Repository\Institution\InstitutionUnitRepository;
use TheCodingMachine\GraphQLite\Annotations\Cost;
use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\SourceField;
use TheCodingMachine\GraphQLite\Annotations\Type;

#[Type(class: InstitutionUnitType::class, name: 'InstitutionUnitType')]
#[SourceField(name: 'id')]
#[SourceField(name: 'name')]
#[SourceField(name: 'slug')]
#[SourceField(name: 'oldId')]
class TypeOfInstitutionUnit
{
    public function __construct(
        private readonly InstitutionUnitRepository $unitRepository,
    ) {}

    #[Field(outputType: 'Int!', description: 'The number of institution units')]
    #[Cost(complexity: 50)]
    public function getNumberOfInstitutionUnits(InstitutionUnitType $unitType): int
    {
        return $this->unitRepository->countAllByParams(unitTypeId: $unitType->getId());
    }
}

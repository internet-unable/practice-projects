<?php

namespace App\GraphQL\InstitutionUnit\Input;

use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\Input;

#[Input(description: 'Input for filtering institution units')]
class InstitutionUnitFilterInput
{
    #[Field(description: "Selection of institutional units in the area")]
    public ?int $areaId = null;

    #[Field(description: "Selection of institutional units int the given districts", inputType: '[Int]')]
    public ?array $districtIds = null;

    #[Field(description: "Selection of institutional units int the given cities", inputType: '[Int]')]
    public ?array $cityIds = null;

    #[Field(description: "Selection of institutional units int the given city districts", inputType: '[Int]')]
    public ?array $cityDistrictIds = null;

    #[Field(description: "Selection of institutional units by types", inputType: '[Int]')]
    public ?array $unitTypeIds = null;

    #[Field(description: "Selection of units for the institution")]
    public ?int $institutionId = null;

    #[Field(description: "Selection of units with comments")]
    public ?bool $onlyWithComments = false;
}

<?php

namespace App\GraphQL\InstitutionUnitType\Input;

use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\Input;

#[Input(description: 'Input for filtering institution unit types')]
class InstitutionUnitTypeFilter
{
    #[Field(description: "Select types for units in provided city")]
    public ?int $cityId = null;

    #[Field(description: "Select types for units in provided city district")]
    public ?int $cityDistrictId = null;

    #[Field(description: "Select types which has institution units")]
    public bool $onlyWithInstitutionUnits = false;

    public function toArray(): array
    {
        return [
            'cityId' => $this->cityId,
            'cityDistrictId' => $this->cityDistrictId,
            'onlyWithInstitutionUnits' => $this->onlyWithInstitutionUnits,
        ];
    }
}

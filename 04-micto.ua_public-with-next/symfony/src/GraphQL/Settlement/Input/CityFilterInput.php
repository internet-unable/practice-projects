<?php

namespace App\GraphQL\Settlement\Input;

use App\Entity\CityType;
use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\Input;

#[Input(description: 'Input for filtering cities')]
class CityFilterInput
{
    #[Field(description: "Selection cities of a given area")]
    public ?int $areaId = null;

    #[Field(description: "Selection cities which has institutional units of a given type")]
    public ?int $unitTypeId = null;

    #[Field(description: "Selection cities with type city or special")]
    public ?bool $onlyCities = null;
}

<?php

namespace App\GraphQL\Settlement\Input;

use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\Input;

#[Input(description: 'Input for filtering districts')]
class DistrictFilterInput
{
    #[Field(description: "Selection districts which has institutional units of a given type")]
    public ?int $unitTypeId = null;
}

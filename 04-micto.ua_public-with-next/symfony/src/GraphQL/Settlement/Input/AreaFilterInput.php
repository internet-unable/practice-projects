<?php

namespace App\GraphQL\Settlement\Input;

use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\Input;

#[Input(description: 'Input for filtering areas')]
class AreaFilterInput
{
    #[Field(description: "Selection areas which has institutional units of a given type")]
    public ?int $unitTypeId = null;
}

<?php

namespace App\GraphQL\InstitutionUnitType\Input;

use App\GraphQL\Common\Order\OrderInput;
use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\Input;
use TheCodingMachine\GraphQLite\Annotations\SourceField;

#[Input(description: 'Order input type for institution unit type')]
#[SourceField(name: 'direction')]
class InstitutionUnitTypeOrder extends OrderInput
{
    #[Field]
    public ?InstitutionUnitTypeOrderField $field = null;
}

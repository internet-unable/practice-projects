<?php

namespace App\GraphQL\Common\Order;

use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\Input;

// todo: add interface
#[Input]
class OrderInput
{
//    #[Field]
//    public $field = null;

    #[Field]
    public ?OrderDirection $direction = null;
}

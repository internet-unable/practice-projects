<?php

namespace App\GraphQL\Comment\Input;

use App\GraphQL\Common\Order\OrderInput;
use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\Input;
use TheCodingMachine\GraphQLite\Annotations\SourceField;

#[Input(description: 'Order input type for comments')]
#[SourceField(name: 'direction')]
class CommentOrder extends OrderInput
{
    #[Field]
    public CommentOrderField $field;
}

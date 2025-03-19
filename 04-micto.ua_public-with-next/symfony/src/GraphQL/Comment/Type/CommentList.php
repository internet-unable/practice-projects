<?php

namespace App\GraphQL\Comment\Type;

use App\GraphQL\Common\Pagination\AbstractItemList;
use TheCodingMachine\GraphQLite\Annotations\SourceField;
use TheCodingMachine\GraphQLite\Annotations\Type;

#[Type]
#[SourceField(name: 'pageInfo')]
#[SourceField(name: 'items', outputType: '[Comment!]')]
class CommentList extends AbstractItemList
{
}

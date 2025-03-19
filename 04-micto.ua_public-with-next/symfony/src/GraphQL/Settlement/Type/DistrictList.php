<?php

namespace App\GraphQL\Settlement\Type;

use App\GraphQL\Common\Pagination\AbstractItemList;
use TheCodingMachine\GraphQLite\Annotations\SourceField;
use TheCodingMachine\GraphQLite\Annotations\Type;

#[Type]
#[SourceField(name: 'pageInfo')]
#[SourceField(name: 'items', outputType: '[District!]')]
class DistrictList extends AbstractItemList
{
}

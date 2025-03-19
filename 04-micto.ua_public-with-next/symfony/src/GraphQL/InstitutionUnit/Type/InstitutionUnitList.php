<?php

namespace App\GraphQL\InstitutionUnit\Type;

use App\GraphQL\Common\Pagination\AbstractItemList;
use TheCodingMachine\GraphQLite\Annotations\SourceField;
use TheCodingMachine\GraphQLite\Annotations\Type;

#[Type]
#[SourceField(name: 'pageInfo')]
#[SourceField(name: 'items', outputType: '[InstitutionUnit!]')]
class InstitutionUnitList extends AbstractItemList
{
}

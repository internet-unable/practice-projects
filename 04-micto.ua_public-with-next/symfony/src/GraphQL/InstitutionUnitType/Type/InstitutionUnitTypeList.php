<?php

namespace App\GraphQL\InstitutionUnitType\Type;

use App\GraphQL\Common\Pagination\AbstractItemList;
use TheCodingMachine\GraphQLite\Annotations\SourceField;
use TheCodingMachine\GraphQLite\Annotations\Type;

#[Type]
#[SourceField(name: 'pageInfo')]
#[SourceField(name: 'items', outputType: '[InstitutionUnitType!]')]
class InstitutionUnitTypeList extends AbstractItemList
{
}

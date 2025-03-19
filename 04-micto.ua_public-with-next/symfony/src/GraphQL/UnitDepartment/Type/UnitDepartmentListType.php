<?php

namespace App\GraphQL\UnitDepartment\Type;

use App\GraphQL\Common\Pagination\AbstractItemList;
use TheCodingMachine\GraphQLite\Annotations\SourceField;
use TheCodingMachine\GraphQLite\Annotations\Type;

#[Type(name: 'UnitDepartmentList')]
#[SourceField(name: 'pageInfo')]
#[SourceField(name: 'items', outputType: '[UnitDepartment!]')]
class UnitDepartmentListType extends AbstractItemList
{
}

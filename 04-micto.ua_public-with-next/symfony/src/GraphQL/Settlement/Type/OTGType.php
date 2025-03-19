<?php

namespace App\GraphQL\Settlement\Type;

use App\Entity\OTG;
use TheCodingMachine\GraphQLite\Annotations\SourceField;
use TheCodingMachine\GraphQLite\Annotations\Type;

#[Type(class: OTG::class, name: 'OTG')]
#[SourceField(name: 'id')]
#[SourceField(name: 'name')]
#[SourceField(name: 'katottg')]

#[SourceField(name: 'area')]
#[SourceField(name: 'district')]
class OTGType
{
}

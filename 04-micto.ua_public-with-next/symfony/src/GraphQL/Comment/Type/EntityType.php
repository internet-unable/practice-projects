<?php

namespace App\GraphQL\Comment\Type;

use App\Entity\Comment;
use TheCodingMachine\GraphQLite\Annotations\Type;

#[Type]
enum EntityType: string
{
    case INSTITUTION = Comment::TYPE_INSTITUTION;
    case INSTITUTION_UNIT = Comment::TYPE_INSTITUTION_UNIT;
    case UNIT_DEPARTMENT = Comment::TYPE_UNIT_DEPARTMENT;
}

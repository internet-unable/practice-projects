<?php

namespace App\GraphQL\Institution\Type;

use App\Entity\Comment;
use TheCodingMachine\GraphQLite\Annotations\Type;

#[Type]
enum CreateInstitutionRequestUserType: string
{
    case VISITOR = 'visitor';
    case INSTITUTION = 'institution';
}

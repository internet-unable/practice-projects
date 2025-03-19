<?php

namespace App\GraphQL\Institution\Type;

use App\Entity\Comment;
use TheCodingMachine\GraphQLite\Annotations\Type;

#[Type]
enum CreateInstitutionRequestStatusType: string
{
    case OCCUPIED = 'occupied';
    case RELOCATED = 'relocated';
    case ATTACKED = 'attacked';
}

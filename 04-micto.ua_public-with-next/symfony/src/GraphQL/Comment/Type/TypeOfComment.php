<?php

namespace App\GraphQL\Comment\Type;

use TheCodingMachine\GraphQLite\Annotations\Type;

#[Type]
enum TypeOfComment: string
{
    /*
    * !!! Types must much to App\Entity\CommentType values
    **/
    case REVIEW = 'review';
    case QUESTION = 'question';
    case COMPLAINT = 'complaint';
    case GRATITUDE = 'gratitude';
}

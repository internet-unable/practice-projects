<?php

namespace App\GraphQL\Comment\Input;

enum CommentOrderField: string
{
    case DATE = 'date';
    case ANSWERED = 'ANSWERED';
}

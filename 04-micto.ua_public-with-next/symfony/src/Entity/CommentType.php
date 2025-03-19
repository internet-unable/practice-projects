<?php

namespace App\Entity;

enum CommentType: string
{
    case QUESTION = 'question';
    case REVIEW = 'review';
    case REPLY = 'reply';
    case COMPLAINT = 'complaint';
    case GRATITUDE = 'gratitude';
}

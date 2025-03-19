<?php

namespace App\GraphQL\Notification\Type;

use App\Entity\Comment;
use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\Type;

#[Type]
class CommentNotification extends AbstractNotification implements NotificationInterface
{
    #[Field(description: 'Comment data')]
    public function getComment(): Comment
    {
        return $this->notification->getComment();
    }
}

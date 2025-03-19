<?php

namespace App\GraphQL\Notification\Type;

use App\Entity\Comment;
use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\Type;

#[Type]
class CommentReplyNotification extends AbstractNotification implements NotificationInterface
{
    #[Field(description: 'Main thread comment data')]
    public function getThread(): Comment
    {
        return $this->notification->getComment()->getRootItem();
    }

    #[Field(description: 'Data of comment being replied to')]
    public function getReplyTo(): Comment
    {
        return $this->notification->getComment()->getParentItem();
    }

    #[Field(description: 'Reply comment data')]
    public function getReply(): Comment
    {
        return $this->notification->getComment();
    }
}

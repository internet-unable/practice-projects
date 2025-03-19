<?php

namespace App\GraphQL\Comment\Transformer;

use App\Entity\Comment;
use App\Entity\CommentType;
use App\GraphQL\Comment\Input\ReplyCommentInput;

class CommentTransformer
{
    public function replyInputToComment(
        ReplyCommentInput $input,
        ?Comment $comment = null,
    ): Comment
    {
        if (!$comment) {
            $comment = new Comment();
        }

        $comment->setType(CommentType::REPLY);
        $comment->setText($input->text);

        return $comment;
    }
}

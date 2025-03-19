<?php

namespace App\Service\Comment;

use App\Entity\Comment;
use App\Service\PhoneFormatter;
use Doctrine\Bundle\DoctrineBundle\Attribute\AsEntityListener;
use Doctrine\ORM\Events;

#[AsEntityListener(event: Events::prePersist, method: 'prePersist', entity: Comment::class)]
#[AsEntityListener(event: Events::preUpdate, method: 'preUpdate', entity: Comment::class)]
class CommentEventListener
{
    public function __construct(
        private readonly PhoneFormatter $phoneFormatter,
    ){}

    public function prePersist(Comment $comment): void
    {
        $this->formatCommentPhone($comment);
    }

    public function preUpdate(Comment $comment): void
    {
        $this->formatCommentPhone($comment);
    }

    private function formatCommentPhone(Comment $comment): void
    {
        if (!$phone = $comment->getPhone()) {
            return;
        }

        $phone = $this->phoneFormatter->getClearPhoneNumber($phone);

        $comment->setPhone($phone);
    }
}

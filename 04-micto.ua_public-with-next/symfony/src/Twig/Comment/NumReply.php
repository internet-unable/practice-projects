<?php

namespace App\Twig\Comment;

use App\Entity\Comment;
use App\Repository\CommentRepository;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class NumReply extends AbstractExtension
{
    public function __construct(
        private readonly CommentRepository $commentRepo,
    ){}

    public function getFunctions(): array
    {
        return [
            new TwigFunction('num_reply', [$this, 'getNumReply']),
        ];
    }

    public function getNumReply(Comment $comment): int
    {
        return $this->commentRepo->countCommentReplies($comment->getId());
    }
}

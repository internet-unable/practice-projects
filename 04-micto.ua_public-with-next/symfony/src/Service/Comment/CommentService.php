<?php

namespace App\Service\Comment;

use App\Entity\Comment;
use App\Entity\CommentType;
use App\Repository\CommentRepository;
use App\Service\Paginator\PaginatorService;
use SoftUa\UserBundle\Entity\User;
use Symfony\Component\Security\Core\User\UserInterface;

class CommentService
{
    public function __construct(
        private readonly CommentRepository $commentRepo,
        private readonly PaginatorService $paginatorService,
        private readonly CommentTypeService $commentTypeService,
    ){}

    public function create(
        Comment $comment,
        string $entityType,
        int $entityId,
        ?UserInterface $user = null,
    ): void
    {
        $comment->setEntity($this->commentTypeService->getEntity($entityType, $entityId));
        $comment->setIsPublished(false);

        if ($user instanceof User) {
            $comment->setUser($user);
            $comment->setIsAdminComment($user->isAdminUser());
            $comment->setIsInstitutionComment($user->isInstitution());
        }

        $this->commentRepo->save($comment);
    }

    public function createReply(
        Comment $parentComment,
        Comment $replyComment,
        ?UserInterface $user = null,
    ): void
    {
        $replyComment->setType(CommentType::REPLY);
        $replyComment->setIsPublished(false);
        $replyComment->setMark(null);
        $replyComment->setEntity($parentComment->getEntity());
        $replyComment->setParentItem($parentComment);
        $replyComment->setRootItem($parentComment->getRootItem() ?: $parentComment);

        if ($user instanceof User) {
            $replyComment->setName($user->getFirstName() . ' ' . $user->getLastName());
            $replyComment->setUser($user);
            $replyComment->setIsAdminComment($user->isAdminUser());
            $replyComment->setIsInstitutionComment($user->isInstitution());
            $replyComment->setIsPublished(true);
        }
        
        $this->commentRepo->save($replyComment);
    }
}

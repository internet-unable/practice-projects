<?php

namespace App\Controller\Api;

use App\Components\ApiResponse;
use App\Entity\Comment;
use App\Repository\CommentRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Routing\Attribute\Route;

class ToggleCommentReactionController extends AbstractController
{
    public function __construct(
        private readonly CommentRepository $commentRepo,
    ){}

    #[Route('/api/toggle_comment_reaction/{id}/{type}/', 'api_toggle_comment_reaction')]
    public function toggleCommentReaction(int $id, string $type, Request $request): Response
    {
        /** @var Comment|null $comment */
        $comment = $this->commentRepo->find($id);

        if (!$comment) {
            return (new ApiResponse())
                ->setResult(false)
                ->addError('Comment not found');
        }

        $session = $request->getSession();
        $add = $request->get('add', true);

        if ($type === 'like') {
            $this->updateCommentLikes($comment, $session, $add);
        } elseif ($type === 'dislike') {
            $this->updateCommentDislikes($comment, $session, $add);
        } else {
            return (new ApiResponse())
                ->setResult(false)
                ->addError('Invalid reaction type');
        }

        return (new ApiResponse())
            ->setResult(true)
            ->setData([
                'likes' => $comment->getNumLikes(),
                'dislikes' => $comment->getNumDislikes(),
            ]);
    }

    private function updateCommentLikes(
        Comment $comment,
        SessionInterface $session,
        bool $addLike = true,
    )
    {
        if ($session->get('like_'.$comment->getId())) {
            $addLike = false;
        }

        if ($addLike) {
            $comment->setNumLikes($comment->getNumLikes() + 1);
        } else {
            $num = $comment->getNumLikes() - 1;
            $comment->setNumLikes(max($num, 0));
        }

        $this->commentRepo->save($comment);

        if ($addLike) {
            $session->set('like_'.$comment->getId(), true);

            if ($session->get('dislike_'.$comment->getId())) {
                $this->updateCommentDislikes($comment, $session, false);
            }
        } else {
            $session->remove('like_'.$comment->getId());
        }
    }

    private function updateCommentDislikes(
        Comment $comment,
        SessionInterface $session,
        bool $addLike = true,
    )
    {
        if ($session->get('dislike_'.$comment->getId())) {
            $addLike = false;
        }

        if ($addLike) {
            $comment->setNumDislikes($comment->getNumDislikes() + 1);
        } else {
            $num = $comment->getNumDislikes() - 1;
            $comment->setNumDislikes(max($num, 0));
        }

        $this->commentRepo->save($comment);

        if ($addLike) {
            $session->set('dislike_'.$comment->getId(), true);

            if ($session->get('like_'.$comment->getId())) {
                $this->updateCommentLikes($comment, $session, false);
            }
        } else {
            $session->remove('dislike_'.$comment->getId());
        }
    }
}

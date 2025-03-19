<?php

namespace App\Controller\Api;

use App\Components\ApiResponse;
use App\Repository\CommentRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class GetCommentReplies extends AbstractController
{
    const NUM_ON_PAGE = 10;

    public function __construct(
        private readonly CommentRepository $commentRepo,
    ){}

    #[Route(
        '/api/comments/replies/{commentId}/{page}/',
        name: 'api_comment_replies',
        requirements: [
            'page' => '\d+',
            'commentId' => '\d+',
        ]
    )]
    public function getReplies(int $commentId, int $page): Response
    {
        $page = $page > 0 ? $page : 1;
        $offset = self::NUM_ON_PAGE * ($page-1);

        $rootComment = $this->commentRepo->getById($commentId);

        if (!$rootComment) {
            return (new ApiResponse())->setResult(false)->setData(['html' => '']);
        }

        $numReplies = $this->commentRepo->countCommentReplies($rootComment->getId());
        $numPages = ceil($numReplies/self::NUM_ON_PAGE);

        if ($page > $numPages) {
            return (new ApiResponse())->setResult(false)->setData(['html' => '']);
        }

        $replies = $this->commentRepo->getCommentReplies(
            commentId: $rootComment->getId(),
            limit: self::NUM_ON_PAGE,
            offset: $offset,
        );

        return (new ApiResponse())
            ->setData([
                'html' => $this->renderView('components/comment/replies_list.html.twig', [
                    'replies' => $replies,
                    'nextPage' => $page+1 <= $numPages ? $page+1 : null,
                    'baseComment' => $rootComment,
                ]),
            ]);
    }
}

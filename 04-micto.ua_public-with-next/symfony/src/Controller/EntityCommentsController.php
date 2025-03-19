<?php

namespace App\Controller;

use App\Components\ApiResponse;
use App\Entity\Comment;
use App\Entity\CommentType;
use App\Entity\Institution\Institution;
use App\Entity\Institution\InstitutionUnit;
use App\Entity\Institution\InstitutionUnitDepartment;
use App\Repository\CommentRepository;
use App\Service\Comment\CommentServiceException;
use App\Service\Comment\CommentTypeService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class EntityCommentsController extends AbstractController
{
    const NUM_ON_PAGE = 10;

    private const QUESTION_TYPES = [
        CommentType::QUESTION
    ];

    private const REVIEW_TYPES = [
        CommentType::GRATITUDE,
        CommentType::COMPLAINT,
        CommentType::REVIEW,
    ];

    public function __construct(
        private readonly CommentRepository $commentRepo,
        private readonly CommentTypeService $commentTypeService,
    ){}

    #[Route(
        '/api/comments/{entityType}/{entityId}/{type}/{page}/',
        name: 'api_get_comments_page',
        requirements: [
            'type' => 'question|review',
            'page' => '\d+',
            'entityId' => '\d+',
        ]
    )]
    public function getCommentsPage(
        string $entityType,
        int $entityId,
        string $type,
        int $page,
    ): Response
    {
        $types = 'question' == $type ? self::QUESTION_TYPES : self::REVIEW_TYPES;
        $page = $page > 0 ? $page : 1;
        $offset = self::NUM_ON_PAGE * ($page-1);

        try {
            $entity = $this->commentTypeService->getEntity($entityType, $entityId);
        } catch (CommentServiceException) {}

        if (empty($entity)) {
            return (new ApiResponse())->setResult(false)->setData(['html' => '']);
        }

        $numComments = $this->commentRepo->countCommentsByParams(
            entity: $entity,
            types: $types,
        );

        $numPages = ceil($numComments/self::NUM_ON_PAGE);

        if ($page > $numPages) {
            return (new ApiResponse())->setResult(false)->setData(['html' => '']);
        }

        $comments = $this->commentRepo->getCommentsByParams(
            entity: $entity,
            types: $types,
            limit: self::NUM_ON_PAGE,
            offset: $offset,
        );

        return (new ApiResponse())
            ->setData([
                'html' => $this->renderView('components/comment/comments_list.html.twig', [
                    'comments' => $comments,
                    'type' => $type,
                    'nextPage' => $page+1 <= $numPages ? $page+1 : null,
                    'baseComment' => (new Comment())->setEntity($entity),
                ]),
            ]);
    }

    public function getList(
        Institution|InstitutionUnit|InstitutionUnitDepartment $entity,
    ): Response
    {
        $numComments = $this->commentRepo->countCommentsByParams(
            entity: $entity,
            types: self::REVIEW_TYPES,
        );

        $comments = $numComments ? $this->commentRepo->getCommentsByParams(
            entity: $entity,
            types: self::REVIEW_TYPES,
            limit: self::NUM_ON_PAGE
        ) : [];

        $numQuestions = $this->commentRepo->countCommentsByParams(
            entity: $entity,
            types: self::QUESTION_TYPES
        );

        $questions = $numQuestions ? $this->commentRepo->getCommentsByParams(
            entity: $entity,
            types: self::QUESTION_TYPES,
            limit: self::NUM_ON_PAGE
        ) : [];

        $comment = (new Comment())->setEntity($entity);

        return $this->render('components/comment/list_wrapper.html.twig', [
            'comments' => $comments,
            'commentsNextPage' => $numComments > count($comments) ? 2 : null,
            'questions' => $questions,
            'questionsNextPage' => $numQuestions > count($questions) ? 2 : null,
            'baseComment' => $comment,
            'total' => $numQuestions + $numComments,
            'numQuestions' => $numQuestions,
            'numComments' => $numComments,
        ]);
    }
}

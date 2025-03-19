<?php

namespace App\GraphQL\Comment\Query;

use App\Entity\Comment;
use App\GraphQL\Comment\Input\CommentFilterInput;
use App\GraphQL\Comment\Input\CommentOrder;
use App\GraphQL\Comment\Type\CommentList;
use App\GraphQL\Comment\Type\EntityType;
use App\GraphQL\Common\Pagination\PaginationInput;
use App\Repository\CommentRepository;
use App\Service\Comment\CommentServiceException;
use App\Service\Comment\CommentTypeService;
use GraphQL\Server\Exception\InvalidQueryParameter;
use SoftUa\UserBundle\Entity\User;
use TheCodingMachine\GraphQLite\Annotations\InjectUser;
use TheCodingMachine\GraphQLite\Annotations\Logged;
use TheCodingMachine\GraphQLite\Annotations\Query;

class CommentQuery
{
    public function __construct(
        private readonly CommentRepository $commentRepo,
        private readonly CommentTypeService $commentTypeService,
    ){}

    #[Query]
    #[Logged]
    public function getComment(int $id): ?Comment
    {
        return $this->commentRepo->getById($id, true);
    }

    #[Query]
    public function entityComments(
        // #[InjectUser]
        // User $user,
        EntityType $entityType,
        int $entityId,
        ?CommentFilterInput $filter = null,
        ?CommentOrder $order = null,
        ?PaginationInput $pagination = null,
    ): CommentList
    {
        try {
            $entity = $this->commentTypeService->getEntity($entityType->value, $entityId);
        } catch (CommentServiceException $e) {
            throw new InvalidQueryParameter($e->getMessage());
        }

        $commentsFilter = [
            'dateFrom' => $filter?->dateFrom,
            'dateTo' => $filter?->dateTo,
            'unitDepartment' => $filter?->unitDepartment,
        ];

        $query = $this->commentRepo->getPublishedCommentsQuery(
            $entity,
            withChildrenUnits: $filter?->withChildrenUnits ?? true,
            types: $filter?->commentType ?? [],
            filter: $commentsFilter,
        );

        $this->commentRepo->injectOrderByToPublishedCommentsQuery(
            $query,
            $order?->field?->value,
            $order?->direction?->value,
            // $user->getId()
        );

        return new CommentList($query, $pagination);
    }

    #[Query]
    #[Logged]
    public function myComments(
        #[InjectUser]
        User $user,
        ?PaginationInput $pagination = null
    ): ?CommentList
    {
        $query = $this->commentRepo->getUserCommentsQuery(
            $user->getId(),
        );

        return new CommentList($query, $pagination);
    }
}

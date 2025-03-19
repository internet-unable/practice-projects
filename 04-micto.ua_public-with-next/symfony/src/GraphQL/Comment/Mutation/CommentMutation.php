<?php

namespace App\GraphQL\Comment\Mutation;

use App\Entity\Comment;
use App\GraphQL\Comment\Input\ReplyCommentInput;
use App\GraphQL\Comment\Transformer\CommentTransformer;
use App\GraphQL\Common\Validator\InputValidator;
use App\Repository\CommentRepository;
use App\Service\Comment\CommentService;
use SoftUa\UserBundle\Entity\User;
use TheCodingMachine\GraphQLite\Annotations\InjectUser;
use TheCodingMachine\GraphQLite\Annotations\Logged;
use TheCodingMachine\GraphQLite\Annotations\Mutation;
use TheCodingMachine\GraphQLite\Exceptions\GraphQLException;
use TheCodingMachine\GraphQLite\Middlewares\MissingAuthorizationException;

class CommentMutation
{
    public function __construct(
        private readonly InputValidator $validator,
        private readonly CommentTransformer $commentTransformer,
        private readonly CommentService $commentService,
        private readonly CommentRepository $commentRepository,
    ){}

    #[Mutation]
    #[Logged]
    public function replyComment(
        ReplyCommentInput $input,
        #[InjectUser]
        User $user,
    ): ?Comment
    {
        if (!$user->isActive()) {
            throw MissingAuthorizationException::forbidden();
        }

        //TODO: Публікувати коли відгук залишає мед заклад або адмін

        if (!$parentComment = $this->commentRepository->getById($input->replyToId)) {
            throw new GraphQLException(
                'Comment not found', // todo: add translation
                code: 404,
                extensions: ['field' => 'replyToId'],
            );
        }

        $this->validator->validate($input);

        $replyComment = $this->commentTransformer->replyInputToComment($input);

        $this->commentService->createReply(
            parentComment: $parentComment,
            replyComment: $replyComment,
            user: $user,
        );

        return $replyComment;
    }
}

<?php

namespace App\GraphQL\Comment\Type;

use App\Entity\Comment;
use App\Entity\Institution\Institution;
use App\Entity\Institution\InstitutionUnit;
use App\Entity\Institution\InstitutionUnitDepartment;
use App\GraphQL\Common\Pagination\PaginationInput;
use App\Repository\CommentRepository;
use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\SourceField;
use TheCodingMachine\GraphQLite\Annotations\Type;

#[Type(class: Comment::class, name: 'Comment')]
#[SourceField(name: 'id')]
#[SourceField(name: 'name')]
#[SourceField(name: 'email')]
#[SourceField(name: 'phone')]
#[SourceField(name: 'text')]
#[SourceField(name: 'text')]
#[SourceField(name: 'mark')]
#[SourceField(name: 'yearOfVisit')]
#[SourceField(name: 'monthOfVisit')]
#[SourceField(name: 'numLikes')]
#[SourceField(name: 'numDislikes')]
#[SourceField(name: 'type')]
#[SourceField(name: 'institution')]
class CommentType
{
    public function __construct(
        private readonly CommentRepository $commentRepo,
    ){}

    // todo: optimize this method
    //  to make only one query for all root comments on the page
    #[Field]
    public function replies(
        Comment $comment,
        ?PaginationInput $pagination = null,
    ): CommentList
    {
        $query = $this->commentRepo->getRepliesQuery([$comment->getId()]);

        return new CommentList($query, $pagination);
    }

    #[Field]
    public function replyTo(Comment $comment): ?Comment
    {
        return $comment->getParentItem();
    }

    #[Field]
    public function getDateCreated(Comment $comment): string
    {
        return $comment->getCreatedAt()->format('Y-m-d H:i:s');
    }

    #[Field]
    public function getUnit(Comment $comment): ?InstitutionUnit
    {
        return $comment->getInstitutionUnit();
    }

    #[Field]
    public function getDepartment(Comment $comment): ?InstitutionUnitDepartment
    {
        return $comment->getInstitutionUnitDepartment();
    }
}

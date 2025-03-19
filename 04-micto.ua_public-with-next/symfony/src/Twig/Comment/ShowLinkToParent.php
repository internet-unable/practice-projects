<?php

namespace App\Twig\Comment;

use App\Entity\Comment;
use App\Entity\Institution\Institution;
use App\Entity\Institution\InstitutionUnitDepartment;
use App\Repository\CommentRepository;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class ShowLinkToParent extends AbstractExtension
{
    public function __construct(
        private readonly CommentRepository $commentRepo,
    ){}

    public function getFunctions(): array
    {
        return [
            new TwigFunction('show_unit_link', [$this, 'isShowUnitLink']),
            new TwigFunction('show_department_link', [$this, 'isShowDepartmentLink']),
        ];
    }

    public function isShowUnitLink(Comment $comment, mixed $parentEntity): bool
    {
        return $parentEntity instanceof Institution
            && !$comment->getEntity() instanceof Institution;
    }

    public function isShowDepartmentLink(Comment $comment, mixed $parentEntity): bool
    {
        return !$parentEntity instanceof InstitutionUnitDepartment
            && $comment->getEntity() instanceof InstitutionUnitDepartment;
    }
}

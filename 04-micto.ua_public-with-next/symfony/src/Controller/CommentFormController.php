<?php

namespace App\Controller;

use App\Entity\Comment;
use App\Entity\CommentType;
use App\Entity\Institution\Institution;
use App\Entity\Institution\InstitutionUnit;
use App\Entity\Institution\InstitutionUnitDepartment;
use App\Form\Comment\QuestionCommentType;
use App\Form\Comment\ReplyToCommentType;
use App\Form\Comment\ReviewCommentType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class CommentFormController extends AbstractController
{
    public function getReviewForm(
        Institution|InstitutionUnit|InstitutionUnitDepartment $entity,
    ): Response
    {
        $comment = new Comment();
        $comment->setEntity($entity);

        $form = $this->createForm(ReviewCommentType::class, $comment);

        $form->get('type')->setData(CommentType::REVIEW);
        $form->get('entityType')->setData($comment->getEntityType());
        $form->get('entityId')->setData($comment->getEntity()->getId());

        return $this->render('components/comment/review_form.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    public function getQuestionForm(
        Institution|InstitutionUnit|InstitutionUnitDepartment $entity,
    ): Response
    {
        $comment = new Comment();
        $comment->setEntity($entity);

        $form = $this->createForm(QuestionCommentType::class, $comment);

        $form->get('entityType')->setData($comment->getEntityType());
        $form->get('entityId')->setData($comment->getEntity()->getId());

        return $this->render('components/comment/question_form.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    public function getReplyForm(): Response
    {
        $form = $this->createForm(ReplyToCommentType::class, new Comment());

        return $this->render('components/comment/reply_form.html.twig', [
            'form' => $form->createView(),
        ]);
    }
}

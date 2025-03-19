<?php

namespace App\Controller\Api;

use App\Components\ApiResponse;
use App\Entity\Comment;
use App\Entity\CommentType;
use App\Entity\Institution\InstitutionUnit;
use App\Form\Comment\QuestionCommentType;
use App\Form\Comment\ReplyToCommentType;
use App\Form\Comment\ReviewCommentType;
use App\Repository\CommentRepository;
use App\Repository\Institution\InstitutionUnitRepository;
use App\Service\Comment\CommentService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\FormError;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class CreateCommentController extends AbstractController
{
    public function __construct(
        private readonly CommentService $commentService,
        private readonly CommentRepository $commentRepo,
        private readonly InstitutionUnitRepository $unitRepository,
    ){}

    #[Route('/api/comment/create/', 'create_comment')]
    public function reviewCreate(Request $request): Response
    {
        $comment = new Comment();
        $form = $this->createForm(ReviewCommentType::class, $comment);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            if ($this->createComment($form, $comment)) {
                return (new ApiResponse())->setResult(true);
            }
        }

        $formHtml = $this->render("components/comment/review_form.html.twig", [
            'form' => $form->createView(),
        ])->getContent();

        return (new ApiResponse())
            ->setResult(false)
            ->setData([
                'html' => $formHtml,
            ]);
    }

    #[Route('/api/question/create/', 'create_question')]
    public function questionCreate(Request $request): Response
    {
        $comment = new Comment();
        $comment->setType(CommentType::QUESTION);
        $form = $this->createForm(QuestionCommentType::class, $comment);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            if ($this->createComment($form, $comment)) {
                return (new ApiResponse())->setResult(true);
            }
        }

        $formHtml = $this->render("components/comment/question_form.html.twig", [
            'form' => $form->createView(),
        ])->getContent();

        return (new ApiResponse())
            ->setResult(false)
            ->setData([
                'html' => $formHtml,
            ]);
    }

    #[Route('/api/reply/create/', 'create_reply')]
    public function replyCreate(Request $request): Response
    {
        $comment = new Comment();
        $comment->setType(CommentType::REPLY);
        $form = $this->createForm(ReplyToCommentType::class, $comment);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $parentId = (int)$form->get('replyToId')->getData();

            try {
                if (!$parent = $this->commentRepo->getById($parentId)) {
                    throw new \Exception('Parent comment not found');
                }

                $this->commentService->createReply(
                    parentComment: $parent,
                    replyComment: $comment,
                    user: $this->getUser()
                );

                return (new ApiResponse())->setResult(true);
            } catch (\Exception $ex) {
                $form->addError(new FormError($ex->getMessage()));
            }
        }

        $formHtml = $this->render("components/comment/reply_form.html.twig", [
            'form' => $form->createView(),
        ])->getContent();

        return (new ApiResponse())
            ->setResult(false)
            ->setData([
                'html' => $formHtml,
            ]);
    }

    private function createComment(FormInterface $form, Comment $comment): bool
    {
        try {
            $entityType = $form->get('entityType')->getData();
            $entityId = (int)$form->get('entityId')->getData();

            $unitId = $form->has('unit') ? $form->get('unit')->getData() : null;

            /** @var InstitutionUnit|null $unit */
            if ($unitId && $unit = $this->unitRepository->find($unitId)) {
                if ($unit->getInstitution()->getId() != $entityId) {
                    throw new \Exception('Надіслано невірні дані');
                }

                $entityType = Comment::TYPE_INSTITUTION_UNIT;
                $entityId = $unit->getId();
            }

            $this->commentService->create(
                comment: $comment,
                entityType: $entityType,
                entityId: $entityId,
                user: $this->getUser(),
            );

            return true;
        } catch (\Exception $ex) {
            $form->addError(new FormError($ex->getMessage()));

            return false;
        }
    }
}

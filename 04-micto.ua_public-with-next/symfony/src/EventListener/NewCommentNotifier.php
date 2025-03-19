<?php

namespace App\EventListener;

use App\Controller\Admin\CommentCrudController;
use App\Entity\Comment;
use App\Service\MailerService;
use Doctrine\Bundle\DoctrineBundle\Attribute\AsEntityListener;
use Doctrine\ORM\Event\PostPersistEventArgs;
use Doctrine\ORM\Events;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGenerator;

#[AsEntityListener(event: Events::postPersist, method: 'postPersist', entity: Comment::class)]
final class NewCommentNotifier
{
    private bool $isDevMode;

    public function __construct(
        private readonly MailerService $mailerService,
        private readonly AdminUrlGenerator $adminUrlGenerator,
        private readonly ?string $env = null,
    ) {
        $this->isDevMode = 'dev' == $env;
    }

    public function postPersist(Comment $comment, PostPersistEventArgs $event)
    {
        $adminUrl = $this->adminUrlGenerator
            ->setController(CommentCrudController::class)
            ->setAction(Crud::PAGE_EDIT)
            ->setEntityId($comment->getId())
            ->generateUrl();

        $this->mailerService->sendTplEmail(
            subject: 'Додано новий коментар',
            tpl: '/mail/new_comment.html.twig',
            tplParams: ['comment' => $comment, 'adminUrl' => $adminUrl]
        );
    }
}

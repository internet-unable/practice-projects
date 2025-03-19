<?php

namespace App\EventListener;

use App\Entity\Comment;
use App\Entity\CommentType;
use App\Repository\CommentRepository;
use App\Service\Institution\InstitutionUnitUrlGenerator;
use App\Service\Institution\InstitutionUrlGenerator;
use App\Service\Institution\UnitDepartmentUrlGenerator;
use App\Service\MailerService;
use App\Service\Notification\NotificationService;
use Doctrine\Bundle\DoctrineBundle\Attribute\AsEntityListener;
use Doctrine\ORM\Event\PostPersistEventArgs;
use Doctrine\ORM\Event\PostUpdateEventArgs;
use Doctrine\ORM\Events;
use Psr\Log\LoggerInterface;
use Symfony\Component\Mime\Address;
use Symfony\Component\Mime\Exception\RfcComplianceException;

#[AsEntityListener(event: Events::postPersist, method: 'postPersist', entity: Comment::class)]
#[AsEntityListener(event: Events::postUpdate, method: 'postUpdate', entity: Comment::class)]
final class CommentPublishingNotifier
{
    private bool $isDevMode;

    public function __construct(
        private readonly MailerService $mailerService,
        private readonly CommentRepository $commentRepo,
        private readonly InstitutionUrlGenerator $institutionUrlGenerator,
        private readonly InstitutionUnitUrlGenerator $unitUrlGenerator,
        private readonly UnitDepartmentUrlGenerator $unitDepartmentUrlGenerator,
        private readonly NotificationService $notificationService,
        private readonly ?string $env = null,
    ) {
        $this->isDevMode = 'dev' == $env;
    }

    public function postPersist(Comment $comment, PostPersistEventArgs $event)
    {
        if (!$comment->isPublished() || $comment->isNotificationSent()) {
            return;
        }

        // TODO: Розкоментувати коли буде реалізовано публікацію відгуків одразу при створені з публічної частини
//        $this->sendNotificationToInstitution($comment);
        $this->sendReplayNotification($comment);

        $comment->setIsNotificationSent(true);
        $this->commentRepo->save($comment);

        $this->notificationService->dispatchNewCommentNotification($comment);
    }

    public function postUpdate(Comment $comment, PostUpdateEventArgs $event)
    {
        if (!$comment->isPublished() || $comment->isNotificationSent()) {
            return;
        }

        $this->sendNotificationToAuthor($comment);
        $this->sendNotificationToInstitution($comment);
        $this->sendReplayNotification($comment);

        $comment->setIsNotificationSent(true);
        $this->commentRepo->save($comment);

        $this->notificationService->dispatchNewCommentNotification($comment);
    }

    private function sendNotificationToAuthor(Comment $comment)
    {
        if (!$email = $comment->getEmail()) {
            $email = $comment->getUser()?->getEmail();
        }

        if (!$email) {
            return;
        }

        try {
            $address = !$this->isDevMode ? new Address($email) : null;
        } catch (RfcComplianceException $e) {
            $this->mailLogger->error($e->getMessage(), ['exception' => $e]);

            return;
        }

        $this->mailerService->sendTplEmail(
            subject: '😷 Ваш відгук успішно підтверджено',
            tpl: '/mail/public/comment_published.html.twig',
            tplParams: [
                'url' => $this->getCommentPageUrl($comment),
                'comment' => $comment,
            ],
            address: $address,
        );
    }

    private function sendNotificationToInstitution(Comment $comment)
    {
        if (!$unit = $comment->getInstitutionUnit()) {
            return;
        }

        if (!$authorEmail = $comment->getEmail()) {
            $authorEmail = $comment->getUser()?->getEmail();
        }

        $contacts = $unit->getContacts();
        $email = current($contacts['emails'] ?? [])['email'] ?? null;

        if (!$email || $email == $authorEmail) {
            return;
        }

        try {
            $address = !$this->isDevMode ? new Address($email) : null;
        } catch (RfcComplianceException $e) {
            $this->mailLogger->error($e->getMessage(), ['exception' => $e]);

            return;
        }

        $this->mailerService->sendTplEmail(
            subject: '🏥 Новий відгук про Ваш медичний заклад на порталі - micto.ua',
            tpl: '/mail/public/institution_new_comment.html.twig',
            tplParams: [
                'url' => $this->getCommentPageUrl($comment),
                'comment' => $comment,
            ],
            address: $address,
        );
    }

    private function sendReplayNotification(Comment $comment)
    {
        if ($comment->getType() != CommentType::REPLY) {
            return;
        }

        if (!$repayEmail = $comment->getEmail()) {
            $repayEmail = $comment->getUser()?->getEmail();
        }

        if (!$email = $comment->getParentItem()?->getEmail()) {
            $email = $comment->getParentItem()?->getUser()?->getEmail();
        }

        if (!$email || $email == $repayEmail) {
            return;
        }

        try {
            $address = !$this->isDevMode ? new Address($email) : null;
        } catch (RfcComplianceException $e) {
            $this->mailLogger->error($e->getMessage(), ['exception' => $e]);

            return;
        }

        $this->mailerService->sendTplEmail(
            subject: '😷 Ваш відгук прокоментували',
            tpl: '/mail/public/comment_reply.html.twig',
            tplParams: [
                'url' => $this->getCommentPageUrl($comment),
                'comment' => $comment,
            ],
            address: $address,
        );
    }

    private function getCommentPageUrl(Comment $comment): string
    {
        if ($department = $comment->getInstitutionUnitDepartment()) {
            return $this->unitDepartmentUrlGenerator->getUrl($department, true);
        }

        if ($unit = $comment->getInstitutionUnit()) {
            return $this->unitUrlGenerator->getUrl($unit, true);
        }

        return $this->institutionUrlGenerator->getUrl($comment->getInstitution(), true);
    }
}

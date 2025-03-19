<?php

namespace App\EventListener;

use App\Service\MailerService;
use Doctrine\Bundle\DoctrineBundle\Attribute\AsEntityListener;
use Doctrine\ORM\Event\PostPersistEventArgs;
use Doctrine\ORM\Events;
use Psr\Log\LoggerInterface;
use SoftUa\UserBundle\Entity\UserDataConfirmation;
use SoftUa\UserBundle\Repository\UserDataConfirmationRepository;
use Symfony\Component\Mime\Address;
use Symfony\Component\Mime\Exception\RfcComplianceException;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

#[AsEntityListener(event: Events::postPersist, method: 'postPersist', entity: UserDataConfirmation::class)]
final class ConfirmationNotifier
{
    private bool $isDevMode;

    public function __construct(
        private readonly MailerService $mailerService,
        private readonly UserDataConfirmationRepository $confirmationRepo,
        private readonly UrlGeneratorInterface $generator,
        private readonly LoggerInterface $mailLogger,
        private readonly ?string $env = null,
    ) {
        $this->isDevMode = 'dev' == $env;
    }

    public function postPersist(UserDataConfirmation $confirmation, PostPersistEventArgs $event)
    {
        if (
            !$confirmation->isCompleted()
            && UserDataConfirmation::DATA_TYPE_CHANGE_EMAIL == $confirmation->getDataType()
        ) {
            $this->sendNotificationToChangeEmail($confirmation);
        }
        if (
            !$confirmation->isCompleted()
            && UserDataConfirmation::DATA_TYPE_CHANGE_PASSWORD == $confirmation->getDataType()
        ) {
            $this->sendNotificationToChangePassword($confirmation);
        }
    }

    private function sendNotificationToChangeEmail(UserDataConfirmation $confirmation)
    {
        $email = $confirmation->getNewValue();

        try {
            $address = !$this->isDevMode ? new Address($email) : null;
        } catch (RfcComplianceException $e) {
            $this->mailLogger->error($e->getMessage(), ['exception' => $e]);

            return;
        }

        $this->mailerService->sendTplEmail(
            subject: 'Зміна адреси для входу на Micto.ua',
            tpl: '/mail/public/confirmation_of_email_change.html.twig',
            tplParams: [
                'confirmation' => $confirmation,
                'url' => $this->generator->generate(
                    'confirm_email_change',
                    [
                        'code' => $this->confirmationRepo->generatePublicKey($confirmation)
                    ],
                    UrlGeneratorInterface::ABSOLUTE_URL
                ),
            ],
            address: $address,
        );
    }

    private function sendNotificationToChangePassword(UserDataConfirmation $confirmation)
    {
        $email = $confirmation->getUser()->getEmail();

        try {
            $address = !$this->isDevMode ? new Address($email) : null;
        } catch (RfcComplianceException $e) {
            $this->mailLogger->error($e->getMessage(), ['exception' => $e]);

            return;
        }

        $this->mailerService->sendTplEmail(
            subject: 'Зміна паролю для входу на Micto.ua',
            tpl: '/mail/public/confirmation_of_password_change.html.twig',
            tplParams: [
                'confirmation' => $confirmation,
                'url' => $this->generator->generate(
                    'change_password_page',
                    [
                        'code' => $this->confirmationRepo->generatePublicKey($confirmation)
                    ],
                    UrlGeneratorInterface::ABSOLUTE_URL
                ),
            ],
            address: $address,
        );
    }
}

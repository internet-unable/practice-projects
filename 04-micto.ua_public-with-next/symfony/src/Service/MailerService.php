<?php

namespace App\Service;

use Psr\Log\LoggerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;
use Symfony\Component\Mime\Email;

class MailerService
{
    public function __construct(
        private readonly LoggerInterface $mailLogger,
        private readonly MailerInterface $mailer,
        private readonly string $senderEmail,
        private readonly string $recipientEmail,
    ){}

    /**
     * @param string $subject
     * @param string $tpl
     * @param array $tplParams
     * @param Address|null $address
     */
    public function sendTplEmail(
        string $subject,
        string $tpl,
        array $tplParams,
        Address $address = null,
    ): void
    {
        if ($this->isRuDomain($address)) {
            return;
        }

        try {
            $email = $this->getTemplatedEmail()
                ->subject($subject)
                ->htmlTemplate($tpl)
                ->context($tplParams)
                ->to($address ?? new Address($this->recipientEmail));

            $this->mailer->send($email);
        } catch (\Throwable $e) {
            $this->mailLogger->error('Mail send error: '.$e->getMessage());
        }
    }

    private function getTemplatedEmail(): TemplatedEmail
    {
        return (new TemplatedEmail())
            ->from(new Address(
                $this->senderEmail,
                'Micto.ua'
            ))
            ->priority(Email::PRIORITY_NORMAL);
    }

    private function isRuDomain(?Address $address): bool
    {
        if (!$address) {
            return false;
        }

        return preg_match('/@.*\.ru$/i', $address->getAddress());
    }
}

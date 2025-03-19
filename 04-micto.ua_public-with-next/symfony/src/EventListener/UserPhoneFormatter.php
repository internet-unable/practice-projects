<?php

namespace App\EventListener;

use App\Entity\Comment;
use App\Entity\CommentType;
use App\Repository\CommentRepository;
use App\Service\Institution\InstitutionUnitUrlGenerator;
use App\Service\Institution\InstitutionUrlGenerator;
use App\Service\Institution\UnitDepartmentUrlGenerator;
use App\Service\MailerService;
use App\Service\PhoneFormatter;
use Doctrine\Bundle\DoctrineBundle\Attribute\AsEntityListener;
use Doctrine\ORM\Event\PostUpdateEventArgs;
use Doctrine\ORM\Event\PreFlushEventArgs;
use Doctrine\ORM\Events;
use SoftUa\UserBundle\Entity\User;
use Symfony\Component\Mime\Address;

#[AsEntityListener(event: Events::preFlush, method: 'preFlush', entity: User::class)]
final class UserPhoneFormatter
{
    public function __construct(
        private readonly PhoneFormatter $phoneFormatter
    ) {}

    public function preFlush(User $user, PreFlushEventArgs $event)
    {
        if (empty($user->getPhone())) {
            return;
        }

        $user->setPhone(
            $this->phoneFormatter->getClearPhoneNumber($user->getPhone())
        );
    }
}

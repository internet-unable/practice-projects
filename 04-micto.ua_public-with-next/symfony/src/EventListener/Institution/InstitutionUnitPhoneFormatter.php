<?php

namespace App\EventListener\Institution;

use App\Entity\Institution\InstitutionUnit;
use App\Service\PhoneFormatter;
use Doctrine\Bundle\DoctrineBundle\Attribute\AsEntityListener;
use Doctrine\ORM\Event\PrePersistEventArgs;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use Doctrine\ORM\Events;

#[AsEntityListener(event: Events::prePersist, method: 'prePersist', entity: InstitutionUnit::class)]
#[AsEntityListener(event: Events::preUpdate, method: 'preUpdate', entity: InstitutionUnit::class)]
final class InstitutionUnitPhoneFormatter
{
    public function __construct(
        private readonly PhoneFormatter $phoneFormatter,
    ) {}

    public function prePersist(InstitutionUnit $unit, PrePersistEventArgs $event)
    {
        $this->setPhoneFormat($unit);
    }

    public function preUpdate(InstitutionUnit $unit, PreUpdateEventArgs $event)
    {
        $this->setPhoneFormat($unit);
    }

    private function setPhoneFormat(InstitutionUnit $unit): void
    {
        $unit->setPhones(array_map(function ($phone) {
            $phone['number'] = $this->phoneFormatter->getClearPhoneNumber($phone['number']);

            return $phone;
        }, $unit->getPhones()));
    }
}

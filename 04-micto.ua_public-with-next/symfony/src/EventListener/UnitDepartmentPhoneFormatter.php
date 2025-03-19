<?php

namespace App\EventListener;

use App\Entity\Institution\InstitutionUnitDepartment;
use App\Service\PhoneFormatter;
use Doctrine\Bundle\DoctrineBundle\Attribute\AsEntityListener;
use Doctrine\ORM\Event\PrePersistEventArgs;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use Doctrine\ORM\Events;

#[AsEntityListener(event: Events::prePersist, method: 'prePersist', entity: InstitutionUnitDepartment::class)]
#[AsEntityListener(event: Events::preUpdate, method: 'preUpdate', entity: InstitutionUnitDepartment::class)]
final class UnitDepartmentPhoneFormatter
{
    public function __construct(
        private readonly PhoneFormatter $phoneFormatter,
    ) {}

    public function prePersist(InstitutionUnitDepartment $department, PrePersistEventArgs $event)
    {
        $this->setPhoneFormat($department);
    }

    public function preUpdate(InstitutionUnitDepartment $department, PreUpdateEventArgs $event)
    {
        $this->setPhoneFormat($department);
    }

    private function setPhoneFormat(InstitutionUnitDepartment $department): void
    {
        $department->setPhones(array_map(function ($phone) {
            $phone['number'] = $this->phoneFormatter->getClearPhoneNumber($phone['number']);

            return $phone;
        }, $department->getPhones()));
    }
}

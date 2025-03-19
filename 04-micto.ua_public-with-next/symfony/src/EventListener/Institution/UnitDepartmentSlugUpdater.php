<?php

namespace App\EventListener\Institution;

use App\Entity\Institution\InstitutionUnitDepartment;
use App\Entity\Traits\EncodingTrait;
use Doctrine\Bundle\DoctrineBundle\Attribute\AsEntityListener;
use Doctrine\ORM\Event\PrePersistEventArgs;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use Doctrine\ORM\Events;

#[AsEntityListener(event: Events::prePersist, method: 'prePersist', entity: InstitutionUnitDepartment::class)]
#[AsEntityListener(event: Events::preUpdate, method: 'preUpdate', entity: InstitutionUnitDepartment::class)]
final class UnitDepartmentSlugUpdater
{
    use EncodingTrait;

    public function prePersist(InstitutionUnitDepartment $department, PrePersistEventArgs $event)
    {
        if (empty($department->getSlug())) {
            $department->setSlug($this->encoding($department->getName()));
        }
    }

    public function preUpdate(InstitutionUnitDepartment $department, PreUpdateEventArgs $event)
    {
        $changeSet = $event->getEntityChangeSet();

        if (
            isset($changeSet['name'])
            && !isset($changeSet['slug'])
        ) {
            $department->setSlug($this->encoding($department->getName()));
        }
    }
}

<?php

namespace App\EventListener\Institution;

use App\Entity\Institution\InstitutionUnit;
use App\Entity\Traits\EncodingTrait;
use Doctrine\Bundle\DoctrineBundle\Attribute\AsEntityListener;
use Doctrine\ORM\Event\PrePersistEventArgs;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use Doctrine\ORM\Events;

#[AsEntityListener(event: Events::prePersist, method: 'prePersist', entity: InstitutionUnit::class)]
#[AsEntityListener(event: Events::preUpdate, method: 'preUpdate', entity: InstitutionUnit::class)]
final class InstitutionUnitSlugUpdater
{
    use EncodingTrait;

    public function prePersist(InstitutionUnit $unit, PrePersistEventArgs $event)
    {
        if (empty($unit->getSlug())) {
            $unit->setSlug($this->encoding($unit->getName()));
        }
    }

    public function preUpdate(InstitutionUnit $unit, PreUpdateEventArgs $event)
    {
        $changeSet = $event->getEntityChangeSet();

        if (
            isset($changeSet['name'])
            && !isset($changeSet['slug'])
        ) {
            $unit->setSlug($this->encoding($unit->getName()));
        }
    }
}

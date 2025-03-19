<?php

namespace App\EventListener\Institution;

use App\Entity\Institution\Institution;
use App\Entity\Traits\EncodingTrait;
use Doctrine\Bundle\DoctrineBundle\Attribute\AsEntityListener;
use Doctrine\ORM\Event\PrePersistEventArgs;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use Doctrine\ORM\Events;

#[AsEntityListener(event: Events::prePersist, method: 'prePersist', entity: Institution::class)]
#[AsEntityListener(event: Events::preUpdate, method: 'preUpdate', entity: Institution::class)]
final class InstitutionSlugUpdater
{
    use EncodingTrait;

    public function prePersist(Institution $institution, PrePersistEventArgs $event)
    {
        if (empty($institution->getSlug())) {
            $institution->setSlug($this->encoding($institution->getName()));
        }
    }

    public function preUpdate(Institution $institution, PreUpdateEventArgs $event)
    {
        $changeSet = $event->getEntityChangeSet();

        if (
            isset($changeSet['name'])
            && !isset($changeSet['slug'])
        ) {
            $institution->setSlug($this->encoding($institution->getName()));
        }
    }
}

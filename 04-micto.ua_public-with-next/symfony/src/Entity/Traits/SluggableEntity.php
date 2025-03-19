<?php

namespace App\Entity\Traits;

use Doctrine\ORM\Mapping as ORM;

trait SluggableEntity
{
    #[ORM\Column('slug')]
    protected string $slug = '';

    public function getSlug(): string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): void
    {
        $this->slug = $slug;
    }
}
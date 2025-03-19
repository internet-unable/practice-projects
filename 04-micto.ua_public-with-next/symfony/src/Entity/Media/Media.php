<?php

namespace App\Entity\Media;

use App\Entity\AbstractEntity;
use App\Repository\MediaRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Timestampable\Traits\TimestampableEntity;

#[ORM\Entity(repositoryClass: MediaRepository::class)]
#[ORM\Table('media')]
#[ORM\Index(columns: ['entity_type', 'entity_id'], name: 'media_entity_idx')]
#[ORM\Index(columns: ['type'], name: 'type_idx')]
#[ORM\Index(columns: ['is_optimized'], name: 'is_optimized_idx')]
class Media extends AbstractEntity
{
    use TimestampableEntity;

    const TYPE_GALLERY = 'gallery';

    const ENTITY_TYPE_INSTITUTION = 'institution';
    const ENTITY_TYPE_INSTITUTION_UNIT = 'institution_unit';
    const ENTITY_TYPE_UNIT_DEPARTMENT = 'unit_department';

    #[ORM\Column(type: Types::STRING, length: 255)]
    private string $entityType;

    #[ORM\Column(type: Types::INTEGER)]
    private int $entityId;

    #[ORM\Column(type: Types::STRING, length: 255)]
    private string $path;

    #[ORM\Column(type: Types::INTEGER)]
    private int $size;

    #[ORM\Column(type: Types::STRING, length: 50)]
    private string $type;

    #[ORM\Column(type: Types::STRING, length: 100)]
    private string $mimeType;

    #[ORM\Column(type: Types::INTEGER)]
    private int $displayOrder = 0;

    #[ORM\Column('is_optimized', options: ['default'=>false])]
    private bool $isOptimized = false;

    public function __toString(): string
    {
        return $this->path;
    }

    public function getPath(): string
    {
        return $this->path;
    }

    public function setPath(string $path): self
    {
        $this->path = $path;

        return $this;
    }

    public function getSize(): int
    {
        return $this->size;
    }

    public function setSize(int $size): self
    {
        $this->size = $size;

        return $this;
    }

    public function getEntityType(): string
    {
        return $this->entityType;
    }

    public function setEntityType(string $entityType): self
    {
        $this->entityType = $entityType;

        return $this;
    }

    public function getEntityId(): int
    {
        return $this->entityId;
    }

    public function setEntityId(int $entityId): self
    {
        $this->entityId = $entityId;

        return $this;
    }

    public function getType(): string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getMimeType(): string
    {
        return $this->mimeType;
    }

    public function setMimeType(string $mimeType): self
    {
        $this->mimeType = $mimeType;

        return $this;
    }

    public function getDisplayOrder(): int
    {
        return $this->displayOrder;
    }

    public function setDisplayOrder(int $displayOrder): self
    {
        $this->displayOrder = $displayOrder;

        return $this;
    }

    public function isOptimized(): bool
    {
        return $this->isOptimized;
    }

    public function setIsOptimized(bool $isOptimized): self
    {
        $this->isOptimized = $isOptimized;

        return $this;
    }
}

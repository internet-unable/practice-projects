<?php

namespace App\Entity\Institution;

use App\Repository\Institution\InstitutionUnitTypeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/*
 * Тип підрозділу
 * */
#[ORM\Entity(repositoryClass: InstitutionUnitTypeRepository::class)]
#[ORM\Table('institution_types')] // todo: rename table
class InstitutionUnitType
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private string $name;

    #[ORM\Column('slug', length: 100)]
    private string $slug;

    #[ORM\Column('old_id', nullable: true, options: ['unsigned'=>true])]
    private ?int $oldId = null;

    #[ORM\OneToMany(mappedBy: 'type', targetEntity: InstitutionUnit::class, orphanRemoval: true)]
    private Collection $units;

    public function __construct()
    {
        $this->units = new ArrayCollection();
    }

    public function __toString(): string
    {
        return $this->getName();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getSlug(): string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): self
    {
        $this->slug = $slug;

        return $this;
    }

    public function getOldId(): ?int
    {
        return $this->oldId;
    }

    public function setOldId(?int $oldId): self
    {
        $this->oldId = $oldId;

        return $this;
    }

    /**
     * @return Collection<int, Institution>
     */
    public function getUnits(): Collection
    {
        return $this->units;
    }
}

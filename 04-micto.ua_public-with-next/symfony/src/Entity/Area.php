<?php

namespace App\Entity;

use App\Repository\AreaRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AreaRepository::class)]
#[ORM\Table('areas')]
#[ORM\Index(['slug'])]
class Area
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private string $name;

    #[ORM\Column('slug', length: 50)]
    private string $slug;

    #[ORM\Column(length: 25, nullable: true)]
    private ?string $katottg = null;

    #[ORM\Column('old_id', length: 50, nullable: true, options: ['unsigned'=>true])]
    private ?int $oldId = null;

    #[ORM\OneToMany(mappedBy: 'area', targetEntity: District::class, orphanRemoval: true)]
    private Collection $districts;

    #[ORM\OneToMany(mappedBy: 'area', targetEntity: City::class, orphanRemoval: true)]
    private Collection $cities;

    #[ORM\Column('is_published', options: ['default'=>true])]
    private bool $isPublished = true;

    public function __construct()
    {
        $this->districts = new ArrayCollection();
        $this->cities = new ArrayCollection();
    }

    public function __toString(): string
    {
        return $this->name;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getSlug(): string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): static
    {
        $this->slug = $slug;

        return $this;
    }

    public function getKatottg(): ?string
    {
        return $this->katottg;
    }

    public function setKatottg(?string $katottg): static
    {
        $this->katottg = $katottg;

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

    public function isPublished(): bool
    {
        return $this->isPublished;
    }

    public function setIsPublished(bool $isPublished): self
    {
        $this->isPublished = $isPublished;

        return $this;
    }

    /**
     * @return Collection<int, District>
     */
    public function getDistricts(): Collection
    {
        return $this->districts;
    }

    public function addDistrict(District $district): static
    {
        if (!$this->districts->contains($district)) {
            $this->districts->add($district);
            $district->setArea($this);
        }

        return $this;
    }

    public function removeDistrict(District $district): static
    {
        if ($this->districts->removeElement($district)) {
            // set the owning side to null (unless already changed)
            if ($district->getArea() === $this) {
                $district->setArea(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, City>
     */
    public function getCities(): Collection
    {
        return $this->cities;
    }

    public function addCity(City $city): static
    {
        if (!$this->cities->contains($city)) {
            $this->cities->add($city);
            $city->setArea($this);
        }

        return $this;
    }

    public function removeCity(City $city): static
    {
        if ($this->cities->removeElement($city)) {
            // set the owning side to null (unless already changed)
            if ($city->getArea() === $this) {
                $city->setArea(null);
            }
        }

        return $this;
    }
}

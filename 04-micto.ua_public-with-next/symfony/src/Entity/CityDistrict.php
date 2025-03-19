<?php

namespace App\Entity;

use App\Entity\Institution\InstitutionUnit;
use App\Repository\CityDistrictRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CityDistrictRepository::class)]
#[ORM\Table('city_districts')]
class CityDistrict
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column('slug', length: 50)]
    private string $slug;

    #[ORM\Column(length: 25, nullable: true)]
    private ?string $katottg = null;

    #[ORM\Column('old_id', length: 50, nullable: true, options: ['unsigned'=>true])]
    private ?int $oldId = null;

    #[ORM\ManyToOne(inversedBy: 'cityDistricts')]
    #[ORM\JoinColumn(nullable: false, onDelete: 'CASCADE')]
    private City $city;

    #[ORM\OneToMany(mappedBy: 'cityDistrict', targetEntity: InstitutionUnit::class)]
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

    public function getName(): ?string
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

    public function setSlug(string $slug): self
    {
        $this->slug = $slug;
        return $this;
    }

    public function getKatottg(): ?string
    {
        return $this->katottg;
    }

    public function setKatottg(?string $katottg): self
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

    public function getCity(): City
    {
        return $this->city;
    }

    public function setCity(City $city): static
    {
        $this->city = $city;

        return $this;
    }

    public function getUnits(): Collection
    {
        return $this->units;
    }

    public function setUnits(Collection $units): self
    {
        $this->units = $units;

        return $this;
    }
}

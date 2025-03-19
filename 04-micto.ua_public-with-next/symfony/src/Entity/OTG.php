<?php

namespace App\Entity;

use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table('otg')]
#[ORM\Index(columns:['area_id'], name:'area_id_idx')]
#[ORM\Index(columns:['district_id'], name:'district_id_idx')]
class OTG
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private string $name;

    #[ORM\Column(length: 25, nullable: true)]
    private ?string $katottg = null;

    #[ORM\Column('old_id', length: 50, nullable: true, options: ['unsigned'=>true])]
    private ?int $oldId = null;

    #[ORM\ManyToOne(inversedBy: 'cities')]
    #[ORM\JoinColumn(nullable: false, onDelete: 'CASCADE')]
    private Area $area;

    #[ORM\ManyToOne(inversedBy: 'cities')]
    #[ORM\JoinColumn(nullable: false, onDelete: 'CASCADE')]
    private District $district;

    #[ORM\OneToMany(mappedBy: 'otg', targetEntity: City::class, orphanRemoval: true)]
    private Collection $cities;

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

    public function setName(string $name): self
    {
        $this->name = $name;

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

    public function getArea(): Area
    {
        return $this->area;
    }

    public function setArea(Area $area): self
    {
        $this->area = $area;

        return $this;
    }

    public function getDistrict(): District
    {
        return $this->district;
    }

    public function setDistrict(District $district): self
    {
        $this->district = $district;

        return $this;
    }

    public function getCities(): Collection
    {
        return $this->cities;
    }

    public function setCities(Collection $cities): self
    {
        $this->cities = $cities;

        return $this;
    }
}

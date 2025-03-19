<?php

namespace App\Entity;

use App\Entity\Institution\InstitutionUnit;
use App\Repository\CityRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CityRepository::class)]
#[ORM\Table('cities')]
#[ORM\Index(columns:['area_id'], name:'area_id_idx')]
#[ORM\Index(columns:['district_id'], name:'district_id_idx')]
#[ORM\Index(['type'])]
#[ORM\Index(['slug'])]
#[ORM\Index(['name'])]
class City
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: 'CityTypeEnumType', enumType: CityType::class)]
    private CityType $type = CityType::CITY;

    #[ORM\Column(length: 255)]
    private string $name;

    #[ORM\Column('slug', length: 50)]
    private string $slug;

    #[ORM\Column('area_center', options:['default' => 0])]
    private bool $areaCenter = false;

    #[ORM\Column(length: 25, nullable: true)]
    private ?string $katottg = null;

    #[ORM\Column('old_id', length: 50, nullable: true, options: ['unsigned'=>true])]
    private ?int $oldId = null;

    #[ORM\ManyToOne(inversedBy: 'cities')]
    #[ORM\JoinColumn('area_id', nullable: false, onDelete: 'CASCADE')]
    private Area $area;

    #[ORM\ManyToOne(inversedBy: 'cities')]
    #[ORM\JoinColumn('district_id', onDelete: 'CASCADE')]
    private ?District $district = null;

    #[ORM\ManyToOne(inversedBy: 'cities')]
    #[ORM\JoinColumn('otg_id', onDelete: 'SET NULL')]
    private ?OTG $otg = null;

    #[ORM\OneToMany(mappedBy: 'city', targetEntity: CityDistrict::class, orphanRemoval: true)]
    private Collection $cityDistricts;

    #[ORM\OneToMany(mappedBy: 'city', targetEntity: InstitutionUnit::class, orphanRemoval: true)]
    private Collection $units;

    public function __construct()
    {
        $this->cityDistricts = new ArrayCollection();
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

    public function getArea(): Area
    {
        return $this->area;
    }

    public function setArea(Area $area): self
    {
        $this->area = $area;

        return $this;
    }

    public function getDistrict(): ?District
    {
        return $this->district;
    }

    public function setDistrict(?District $district): self
    {
        $this->district = $district;

        return $this;
    }

    public function getOtg(): ?OTG
    {
        return $this->otg;
    }

    public function setOtg(?OTG $otg): self
    {
        $this->otg = $otg;

        return $this;
    }

    public function getType(): CityType
    {
        return $this->type;
    }

    public function setType(CityType $type): self
    {
        $this->type = $type;

        return $this;
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

    public function isAreaCenter(): bool
    {
        return $this->areaCenter;
    }

    public function setAreaCenter(bool $areaCenter): self
    {
        $this->areaCenter = $areaCenter;

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

    /**
     * @return Collection<int, CityDistrict>
     */
    public function getCityDistricts(): Collection
    {
        return $this->cityDistricts;
    }

    public function addDistrict(CityDistrict $district): static
    {
        if (!$this->cityDistricts->contains($district)) {
            $this->cityDistricts->add($district);
            $district->setCity($this);
        }

        return $this;
    }

    public function removeDistrict(CityDistrict $district): static
    {
        if ($this->cityDistricts->removeElement($district)) {
            // set the owning side to null (unless already changed)
            if ($district->getCity() === $this) {
                $district->setCity(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, InstitutionUnit>
     */
    public function getUnits(): Collection
    {
        return $this->units;
    }
}

<?php

namespace App\Entity;

use App\Entity\Institution\InstitutionUnit;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table('addresses')]
class Address extends AbstractEntity
{
    #[ORM\Column(name: 'entity_id', type: Types::INTEGER)]
    protected int $entityId;

    #[ORM\OneToOne(inversedBy: 'address', targetEntity: InstitutionUnit::class)]
    #[ORM\JoinColumn('entity_id', referencedColumnName: 'id', nullable: false, onDelete: 'CASCADE')]
    private InstitutionUnit $unit;

    #[ORM\Column(type: Types::STRING, length: 2000)]
    private string $address;

    #[ORM\Column(type: Types::DECIMAL, precision: 12, scale: 6, nullable: true)]
    private ?string $latitude;

    #[ORM\Column(type: Types::DECIMAL, precision: 12, scale: 6, nullable: true)]
    private ?string $longitude;

    #[ORM\Column('zip_code', type: Types::STRING, length: 10, nullable: true)]
    private ?string $zipCode;

    #[ORM\Column('map_url', type: Types::STRING, length: 255, nullable: true)]
    private ?string $mapUrl;

    public function __toString(): string
    {
        return $this->getAddress();
    }

    public function getAddress(): string
    {
        return $this->address;
    }

    public function setAddress(string $address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getUnit(): InstitutionUnit
    {
        return $this->unit;
    }

    public function setUnit(InstitutionUnit $unit): self
    {
        $this->unit = $unit;

        return $this;
    }

    public function getLatitude(): ?string
    {
        return $this->latitude;
    }

    public function setLatitude(?float $latitude): self
    {
        $this->latitude = $latitude;

        return $this;
    }

    public function getLongitude(): ?string
    {
        return $this->longitude;
    }

    public function setLongitude(?float $longitude): self
    {
        $this->longitude = $longitude;

        return $this;
    }

    public function getZipCode(): ?string
    {
        return $this->zipCode;
    }

    public function setZipCode(?string $zipCode): self
    {
        $this->zipCode = $zipCode;

        return $this;
    }

    public function getMapUrl(): ?string
    {
        return $this->mapUrl;
    }

    public function setMapUrl(?string $mapUrl): self
    {
        $this->mapUrl = $mapUrl;

        return $this;
    }
}

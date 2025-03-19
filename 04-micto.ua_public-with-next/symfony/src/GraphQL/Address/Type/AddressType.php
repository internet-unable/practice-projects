<?php

namespace App\GraphQL\Address\Type;

use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\Type;

#[Type(name: 'Address')]
class AddressType
{
    #[Field(description: 'Address string', inputType: 'String!')]
    public string $address;

    #[Field(description: 'Postal ZIP code')]
    public ?string $zipCode = null;

    #[Field(description: 'Latitude')]
    public ?string $lat = null;

    #[Field(description: 'Longitude')]
    public ?string $lon = null;

    public function getAddress(): string
    {
        return $this->address;
    }

    public function setAddress(string $address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getCityId(): int
    {
        return $this->cityId;
    }

    public function setCityId(int $cityId): self
    {
        $this->cityId = $cityId;

        return $this;
    }

    public function getCityDistrictId(): ?int
    {
        return $this->cityDistrictId;
    }

    public function setCityDistrictId(?int $cityDistrictId): self
    {
        $this->cityDistrictId = $cityDistrictId;

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

    public function getLat(): ?string
    {
        return $this->lat;
    }

    public function setLat(?string $lat): self
    {
        $this->lat = $lat;

        return $this;
    }

    public function getLon(): ?string
    {
        return $this->lon;
    }

    public function setLon(?string $lon): self
    {
        $this->lon = $lon;

        return $this;
    }
}

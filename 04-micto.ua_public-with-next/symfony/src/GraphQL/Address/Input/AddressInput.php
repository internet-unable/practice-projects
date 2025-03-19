<?php

namespace App\GraphQL\Address\Input;

use Symfony\Component\Validator\Constraints as Assert;
use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\Input;

#[Input(description: 'Input type for Address')]
class AddressInput
{
    #[Assert\NotBlank]
    #[Field(description: 'Address string', inputType: 'String!')]
    public string $address;

    #[Field(description: 'City ID', inputType: 'Int!')]
    public int $cityId;

    #[Field(description: 'City district ID', inputType: 'Int')]
    public ?int $cityDistrictId = null;

    #[Assert\Length(max: 10)]
    #[Field(description: 'Postal ZIP code')]
    public ?string $zipCode = null;

    #[Field(description: 'Latitude')]
    public ?float $lat = null;

    #[Field(description: 'Longitude')]
    public ?float $lon = null;
}

<?php

namespace App\GraphQL\Address\Transformer;

use App\Entity\Address;
use App\GraphQL\Address\Input\AddressInput;
use App\GraphQL\Address\Type\AddressType;

class AddressTransformer
{
    public function inputToAddress(AddressInput $addressInput, ?Address $address): Address
    {
        if (!$address) {
            $address = new Address();
        }

        return $address
            ->setAddress($addressInput->address)
            ->setZipCode($addressInput->zipCode)
            ->setLatitude($addressInput->lat)
            ->setLongitude($addressInput->lon);
    }

    public function addressToType(Address $address): AddressType
    {
        return (new AddressType())
            ->setAddress($address->getAddress())
            ->setZipCode($address->getZipCode())
            ->setLat($address->getLatitude())
            ->setLon($address->getLongitude());
    }
}

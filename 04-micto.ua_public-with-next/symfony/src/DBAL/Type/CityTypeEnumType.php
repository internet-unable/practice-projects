<?php

namespace App\DBAL\Type;

use App\Entity\CityType;

class CityTypeEnumType extends EnumType
{
    const NAME = 'CityTypeEnumType';

    public function getName(): string
    {
        return self::NAME;
    }

    protected function getValues(): array
    {
        return array_map(fn(CityType $case) => $case->value, CityType::cases());
    }
}

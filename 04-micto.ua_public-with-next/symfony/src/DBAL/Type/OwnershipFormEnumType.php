<?php

namespace App\DBAL\Type;

use App\Entity\Institution\OwnershipForm;

class OwnershipFormEnumType extends EnumType
{
    const NAME = 'OwnershipFormEnumType';

    public function getName(): string
    {
        return self::NAME;
    }

    protected function getValues(): array
    {
        return array_map(fn(OwnershipForm $case) => $case->value, OwnershipForm::cases());
    }
}

<?php

namespace App\DBAL\Type;

use App\Entity\Institution\LegalForm;

class LegalFormEnumType extends EnumType
{
    const NAME = 'LegalFormEnumType';

    public function getName(): string
    {
        return self::NAME;
    }

    protected function getValues(): array
    {
        return array_map(fn(LegalForm $case) => $case->value, LegalForm::cases());
    }
}

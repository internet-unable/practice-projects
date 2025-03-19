<?php

namespace App\DBAL\Type;

use App\Entity\UserEntity\UserEntityType;

// TODO: Remove it when migration Version20250207170917 will be deployed on prod
class UserEntityEnumType extends EnumType
{
    const NAME = 'UserEntityEnumType';

    public function getName(): string
    {
        return self::NAME;
    }

    protected function getValues(): array
    {
        return ['Institution','InstitutionUnit','InstitutionUnitDepartment'];
    }
}

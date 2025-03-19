<?php

namespace App\DBAL\Type;

use App\Entity\CommentType;

class CommentEnumType extends EnumType
{
    const NAME = 'CommentEnumType';

    public function getName(): string
    {
        return self::NAME;
    }

    protected function getValues(): array
    {
        return array_map(fn(CommentType $case) => $case->value, CommentType::cases());
    }
}

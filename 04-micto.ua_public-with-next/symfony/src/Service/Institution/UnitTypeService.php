<?php

namespace App\Service\Institution;

use App\Entity\Institution\InstitutionUnitType;
use App\Repository\Institution\InstitutionUnitTypeRepository;
use Collator;

class UnitTypeService
{
    public function __construct(
        private readonly InstitutionUnitTypeRepository $unitTypeRepo,
    ) {}

    public function getAllWithAlphabeticalIndex(): array
    {
        /** @var InstitutionUnitType[] $types */
        $types = $this->unitTypeRepo->findAll();

        setlocale(LC_ALL, 'uk_UA.utf8');

        usort($types, function (InstitutionUnitType $a, InstitutionUnitType $b) {
            $coll = new Collator('uk_UA.utf8');

            return $coll->compare($a->getName(), $b->getName());
        });

        $result = [];

        foreach ($types as $type) {
            $firstLetter = mb_substr($type->getName(), 0, 1, 'UTF-8');
            $firstLetter = mb_strtoupper($firstLetter, 'UTF-8');

            if (!isset($result[$firstLetter])) {
                $result[$firstLetter] = [];
            }

            $result[$firstLetter][] = $type;
        }

        return $result;
    }
}

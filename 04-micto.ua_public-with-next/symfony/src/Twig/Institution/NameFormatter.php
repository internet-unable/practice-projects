<?php

namespace App\Twig\Institution;

use App\Entity\Institution\Institution;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class NameFormatter extends AbstractExtension
{
    public function getFunctions(): array
    {
        return [
            new TwigFunction('institution_name', [$this, 'getName']),
        ];
    }

    public function getName(Institution $institution): string
    {
        if (
            !$institution->isHasSeveralUnits()
            && $unit = $institution->getUnits()->first()
        ) {
            return $unit->getName();
        }

        return $institution->getName();
    }
}

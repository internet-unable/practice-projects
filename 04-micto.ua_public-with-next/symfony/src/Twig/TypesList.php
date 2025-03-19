<?php

namespace App\Twig;

use App\Service\Institution\UnitTypeService;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class TypesList extends AbstractExtension
{
    public function __construct(
        private readonly UnitTypeService $unitTypeService,
    ) {}

    public function getFunctions(): array
    {
        return [
            new TwigFunction('ab_types_list', [$this, 'getTypes']),
        ];
    }

    public function getTypes(): array
    {
        return $this->unitTypeService->getAllWithAlphabeticalIndex();
    }
}

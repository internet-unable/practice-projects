<?php

namespace App\Twig;

use App\Repository\AreaRepository;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class AreasList extends AbstractExtension
{
    public function __construct(
        private readonly AreaRepository $areaRepo,
    ) {}

    public function getFunctions(): array
    {
        return [
            new TwigFunction('ab_areas_list', [$this, 'getAreas']),
        ];
    }

    public function getAreas(): array
    {
        $result = [];

        foreach ($this->areaRepo->findWithUnitsByParams() as $area) {
            $firstLetter = mb_substr($area->getName(), 0, 1, 'UTF-8');
            $firstLetter = mb_strtoupper($firstLetter, 'UTF-8');

            if (!isset($result[$firstLetter])) {
                $result[$firstLetter] = [];
            }

            $result[$firstLetter][] = $area;
        }

        return $result;
    }
}

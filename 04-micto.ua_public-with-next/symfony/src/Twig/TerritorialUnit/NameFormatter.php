<?php

namespace App\Twig\TerritorialUnit;

use App\Service\TerritorialUnitNameFormatter;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class NameFormatter extends AbstractExtension
{
    public function __construct(
        private readonly TerritorialUnitNameFormatter $nameFormatter,
    ){}

    public function getFunctions(): array
    {
        return [
            new TwigFunction('tu_name', [$this, 'getFullName']),
        ];
    }

    public function getFullName(mixed $entity, bool $fullForm = false): string
    {
        return $this->nameFormatter->getName($entity, $fullForm);
    }
}

<?php

namespace App\Twig\TerritorialUnit;

use App\Service\TerritorialUnitUrlGenerator;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class UrlGenerator extends AbstractExtension
{
    public function __construct(
        private readonly TerritorialUnitUrlGenerator $generator,
    ){}

    public function getFunctions(): array
    {
        return [
            new TwigFunction('tu_url', [$this, 'getUrl']),
        ];
    }

    public function getUrl(mixed $entity, bool $relative = true): string
    {
        return $this->generator->getUrl($entity, !$relative);
    }
}

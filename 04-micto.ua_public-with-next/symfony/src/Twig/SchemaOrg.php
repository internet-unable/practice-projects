<?php

namespace App\Twig;

use App\Seo\SchemaOrgGenerator;
use Twig\Extension\AbstractExtension;
use Twig\Markup;
use Twig\TwigFunction;

class SchemaOrg extends AbstractExtension
{
    public function __construct(
        private readonly SchemaOrgGenerator $generator,
    ) {}

    public function getFunctions(): array
    {
        return [
            new TwigFunction('schema_org', [$this, 'getSchema']),
        ];
    }

    public function getSchema(): Markup
    {
        $schema = array_map(fn($item) => $item->toScript(), $this->generator->getList());

        return new Markup(implode(PHP_EOL, $schema), 'UTF-8');;
    }
}

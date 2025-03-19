<?php

namespace App\Seo;

use App\Service\TerritorialUnitNameFormatter;
use Leogout\Bundle\SeoBundle\Provider\SeoGeneratorProvider;
use Leogout\Bundle\SeoBundle\Seo\Basic\BasicSeoGenerator;
use Leogout\Bundle\SeoBundle\Seo\Og\OgSeoGenerator;

class SeoGenerator
{
    private BasicSeoGenerator $basicSeoGenerator;
    private OgSeoGenerator $ogSeoGenerator;

    public function __construct(
        private readonly SeoGeneratorProvider $provider,
        protected readonly TerritorialUnitNameFormatter $nameFormatter,
    ) {
        $this->basicSeoGenerator = $provider->get('basic');
        $this->ogSeoGenerator = $provider->get('og');
    }

    public function setTitle(string $title): self
    {
        $title = htmlspecialchars($title);
        $this->basicSeoGenerator->setTitle($title);
        $this->ogSeoGenerator->setTitle($title);

        return $this;
    }

    public function setDescription(string $description): self
    {
        $description = htmlspecialchars($description);
        $this->basicSeoGenerator->setDescription($description);
        $this->ogSeoGenerator->setDescription($description);

        return $this;
    }

    public function setKeywords(string $keywords): self
    {
        $keywords = htmlspecialchars($keywords);
        $this->basicSeoGenerator->setKeywords($keywords);

        return $this;
    }

    public function getBasicSeoGenerator(): BasicSeoGenerator
    {
        return $this->basicSeoGenerator;
    }

    public function getOgSeoGenerator(): OgSeoGenerator
    {
        return $this->ogSeoGenerator;
    }
}

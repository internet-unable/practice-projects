<?php

namespace App\EventListener\Sitemap;

use App\Entity\Institution\InstitutionUnitType;
use App\Repository\Institution\InstitutionUnitTypeRepository;
use App\Service\Institution\UnitTypeUrlGenerator;
use Presta\SitemapBundle\Event\SitemapPopulateEvent;
use Presta\SitemapBundle\Sitemap\Url\UrlConcrete;
use Symfony\Component\EventDispatcher\Attribute\AsEventListener;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

#[AsEventListener(event: SitemapPopulateEvent::class, method: 'populateSitemap', priority: 0)]
final class InstitutionTypeSitemapListener
{
    public function __construct(
        private readonly InstitutionUnitTypeRepository $unitTypeRepo,
        private readonly UnitTypeUrlGenerator $typeUrlGenerator,
    ) {}

    public function populateSitemap(SitemapPopulateEvent $event)
    {
        if (!in_array($event->getSection(), ['pages', null], true)) {
            return;
        }

        $urlContainer = $event->getUrlContainer();

        /** @var InstitutionUnitType[] $types */
        $types = $this->unitTypeRepo->findAll();

        foreach ($types as $type) {
            $urlContainer->addUrl(
                new UrlConcrete(
                    loc: $this->typeUrlGenerator->getUrl($type, true),
                    priority: 0.7
                ),
                'pages'
            );
        }
    }
}

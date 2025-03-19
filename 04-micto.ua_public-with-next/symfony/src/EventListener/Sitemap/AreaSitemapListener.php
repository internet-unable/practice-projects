<?php

namespace App\EventListener\Sitemap;

use App\Repository\AreaRepository;
use App\Service\TerritorialUnitUrlGenerator;
use Presta\SitemapBundle\Event\SitemapPopulateEvent;
use Presta\SitemapBundle\Sitemap\Url\UrlConcrete;
use Symfony\Component\EventDispatcher\Attribute\AsEventListener;

#[AsEventListener(event: SitemapPopulateEvent::class, method: 'populateSitemap', priority: 0)]
final class AreaSitemapListener
{
    public function __construct(
        private readonly AreaRepository $areaRepo,
        private readonly TerritorialUnitUrlGenerator $tuUrlGenerator,
    ) {}

    public function populateSitemap(SitemapPopulateEvent $event)
    {
        if (!in_array($event->getSection(), ['pages', null], true)) {
            return;
        }

        $urlContainer = $event->getUrlContainer();

        foreach ($this->areaRepo->findWithUnitsByParams() as $area) {
            $urlContainer->addUrl(
                new UrlConcrete(
                    loc: $this->tuUrlGenerator->getUrl($area, true),
                    priority: 0.7
                ),
                'pages'
            );
        }
    }
}

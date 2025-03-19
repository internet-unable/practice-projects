<?php

namespace App\EventListener\Sitemap;

use App\Repository\CityDistrictRepository;
use App\Service\TerritorialUnitUrlGenerator;
use Presta\SitemapBundle\Event\SitemapPopulateEvent;
use Presta\SitemapBundle\Sitemap\Url\UrlConcrete;
use Symfony\Component\EventDispatcher\Attribute\AsEventListener;

#[AsEventListener(event: SitemapPopulateEvent::class, method: 'populateSitemap', priority: 0)]
final class CityDistrictSitemapListener
{
    public function __construct(
        private readonly CityDistrictRepository $cityDistrictRepo,
        private readonly TerritorialUnitUrlGenerator $tuUrlGenerator,
    ) {}

    public function populateSitemap(SitemapPopulateEvent $event)
    {
        if (!in_array($event->getSection(), ['pages', null], true)) {
            return;
        }

        $urlContainer = $event->getUrlContainer();

        foreach ($this->cityDistrictRepo->findWithUnitsByParams() as $cityDistrict) {
            $urlContainer->addUrl(
                new UrlConcrete(
                    loc: $this->tuUrlGenerator->getUrl($cityDistrict, true),
                    priority: 0.5
                ),
                'pages'
            );
        }
    }
}

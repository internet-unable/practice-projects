<?php

namespace App\EventListener\Sitemap;

use App\Repository\DistrictRepository;
use App\Service\TerritorialUnitUrlGenerator;
use Presta\SitemapBundle\Event\SitemapPopulateEvent;
use Presta\SitemapBundle\Sitemap\Url\UrlConcrete;
use Symfony\Component\EventDispatcher\Attribute\AsEventListener;

#[AsEventListener(event: SitemapPopulateEvent::class, method: 'populateSitemap', priority: 0)]
final class DistrictSitemapListener
{
    public function __construct(
        private readonly DistrictRepository $districtRepo,
        private readonly TerritorialUnitUrlGenerator $tuUrlGenerator,
    ) {}

    public function populateSitemap(SitemapPopulateEvent $event)
    {
        if (!in_array($event->getSection(), ['pages', null], true)) {
            return;
        }

        $urlContainer = $event->getUrlContainer();

        foreach ($this->districtRepo->findWithUnitsByParams() as $district) {
            $urlContainer->addUrl(
                new UrlConcrete(
                    loc: $this->tuUrlGenerator->getUrl($district, true),
                    priority: 0.6
                ),
                'pages'
            );
        }
    }
}

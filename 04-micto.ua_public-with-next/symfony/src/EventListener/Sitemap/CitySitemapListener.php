<?php

namespace App\EventListener\Sitemap;

use App\Repository\CityRepository;
use App\Service\TerritorialUnitUrlGenerator;
use Presta\SitemapBundle\Event\SitemapPopulateEvent;
use Presta\SitemapBundle\Sitemap\Url\UrlConcrete;
use Symfony\Component\EventDispatcher\Attribute\AsEventListener;

#[AsEventListener(event: SitemapPopulateEvent::class, method: 'populateSitemap', priority: 0)]
final class CitySitemapListener
{
    private const LIMIT = 500;

    public function __construct(
        private readonly CityRepository $cityRepo,
        private readonly TerritorialUnitUrlGenerator $tuUrlGenerator,
    ) {}

    public function populateSitemap(SitemapPopulateEvent $event)
    {
        if (!in_array($event->getSection(), ['pages', null], true)) {
            return;
        }

        $urlContainer = $event->getUrlContainer();

        $numCities = $this->cityRepo->countAllWithUnitsByParams();

        for ($offset = 0; $offset <= $numCities; $offset+=self::LIMIT) {
            foreach ($this->cityRepo->findWithUnitsByParams(limit: self::LIMIT, offset: $offset) as $city) {
                $urlContainer->addUrl(
                    new UrlConcrete(
                        loc: $this->tuUrlGenerator->getUrl($city, true),
                        priority: 0.6
                    ),
                    'cities'
                );
            }
        }
    }
}

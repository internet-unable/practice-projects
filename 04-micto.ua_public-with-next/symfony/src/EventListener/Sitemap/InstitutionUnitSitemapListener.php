<?php

namespace App\EventListener\Sitemap;

use App\Repository\Institution\InstitutionUnitRepository;
use App\Service\Institution\InstitutionUnitUrlGenerator;
use Doctrine\ORM\AbstractQuery;
use Presta\SitemapBundle\Event\SitemapPopulateEvent;
use Presta\SitemapBundle\Sitemap\Url\UrlConcrete;
use Symfony\Component\EventDispatcher\Attribute\AsEventListener;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

#[AsEventListener(event: SitemapPopulateEvent::class, method: 'populateSitemap', priority: 0)]
final class InstitutionUnitSitemapListener
{
    private const LIMIT = 500;

    public function __construct(
        private readonly InstitutionUnitRepository $unitRepo,
        private readonly InstitutionUnitUrlGenerator $unitUrlGenerator,
    ) {}

    public function populateSitemap(SitemapPopulateEvent $event)
    {
        if (!in_array($event->getSection(), ['institutions', null], true)) {
            return;
        }

        $urlContainer = $event->getUrlContainer();

        $numUnits = $this->unitRepo->countAllByParams();

        for ($offset = 0; $offset <= $numUnits; $offset+=self::LIMIT) {
            $units = $this->unitRepo->findAllByParams(
                limit: self::LIMIT,
                offset: $offset,
                hydrationMode: AbstractQuery::HYDRATE_ARRAY
            );

            foreach ($units as $unit) {
                $urlContainer->addUrl(
                    new UrlConcrete(
                        loc: $this->unitUrlGenerator->getUrlByArray($unit, true),
                        priority: 0.8
                    ),
                    'institutions'
                );
            }
        }
    }
}

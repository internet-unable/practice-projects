<?php

namespace App\EventListener\Sitemap;

use App\Repository\Institution\InstitutionRepository;
use App\Service\Institution\InstitutionUrlGenerator;
use Presta\SitemapBundle\Event\SitemapPopulateEvent;
use Presta\SitemapBundle\Sitemap\Url\UrlConcrete;
use Symfony\Component\EventDispatcher\Attribute\AsEventListener;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

#[AsEventListener(event: SitemapPopulateEvent::class, method: 'populateSitemap', priority: 0)]
final class InstitutionSitemapListener
{
    public function __construct(
        private readonly InstitutionRepository $institutionRepo,
        private readonly InstitutionUrlGenerator $urlGenerator,
    ) {}

    public function populateSitemap(SitemapPopulateEvent $event)
    {
        if (!in_array($event->getSection(), ['institutions', null], true)) {
            return;
        }

        $urlContainer = $event->getUrlContainer();

        foreach ($this->institutionRepo->findAllActiveWithSeveralUnits() as $institution) {
            $urlContainer->addUrl(
                new UrlConcrete(
                    loc: $this->urlGenerator->getUrl($institution, true),
                    priority: 0.8
                ),
                'institutions'
            );
        }
    }
}

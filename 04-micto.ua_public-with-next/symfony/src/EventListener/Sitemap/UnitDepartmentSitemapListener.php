<?php

namespace App\EventListener\Sitemap;

use App\Repository\Institution\InstitutionUnitDepartmentRepository;
use App\Service\Institution\UnitDepartmentUrlGenerator;
use Doctrine\ORM\AbstractQuery;
use Presta\SitemapBundle\Event\SitemapPopulateEvent;
use Presta\SitemapBundle\Sitemap\Url\UrlConcrete;
use Symfony\Component\EventDispatcher\Attribute\AsEventListener;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

#[AsEventListener(event: SitemapPopulateEvent::class, method: 'populateSitemap', priority: 0)]
final class UnitDepartmentSitemapListener
{
    private const LIMIT = 500;

    public function __construct(
        private readonly InstitutionUnitDepartmentRepository $unitDepartmentRepo,
        private readonly UnitDepartmentUrlGenerator $urlGenerator,
    ) {}

    public function populateSitemap(SitemapPopulateEvent $event)
    {
        if (!in_array($event->getSection(), ['departments', null], true)) {
            return;
        }

        $urlContainer = $event->getUrlContainer();

        $numDepartments = $this->unitDepartmentRepo->countAllActive();

        for ($offset = 0; $offset <= $numDepartments; $offset+=self::LIMIT) {
            $departments = $this->unitDepartmentRepo->findAllActive(
                limit: self::LIMIT,
                offset: $offset,
                hydrationMode: AbstractQuery::HYDRATE_ARRAY
            );

            foreach ($departments as $department) {
                $urlContainer->addUrl(
                    new UrlConcrete(
                        loc: $this->urlGenerator->getUrlByArray($department, true),
                        priority: 0.7
                    ),
                    'departments'
                );
            }
        }
    }
}

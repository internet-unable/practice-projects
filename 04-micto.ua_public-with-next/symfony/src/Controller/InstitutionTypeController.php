<?php

namespace App\Controller;

use App\Entity\Institution\InstitutionUnitType;
use App\Menu\BreadcrumbBuilder;
use App\Repository\AreaRepository;
use App\Repository\Institution\InstitutionUnitRepository;
use App\Repository\Institution\InstitutionUnitTypeRepository;
use App\Seo\SeoGenerator;
use App\Service\Institution\UnitTypeUrlGenerator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\Translation\TranslatorInterface;

class InstitutionTypeController extends AbstractController
{
    public function __construct(
        private readonly InstitutionUnitTypeRepository $unitTypeRepo,
        private readonly InstitutionUnitRepository $unitRepo,
        private readonly AreaRepository $areaRepo,
        private readonly BreadcrumbBuilder $breadcrumbBuilder,
        private readonly SeoGenerator $seoGenerator,
        private readonly UnitTypeUrlGenerator $typeUrlGenerator,
        private readonly TranslatorInterface $translator,
    ){}

    #[Route(
        '/{slug}-t{id}/',
        name: 'institution_type_page',
        requirements: [
            'id' => '\d+',
            'slug' => '[\w\d\-_]+',
        ]
    )]
    public function typePage(string $slug, int $id): Response
    {
        /** @var InstitutionUnitType|null $unitType */
        if (!$unitType = $this->unitTypeRepo->getOneByOldId($id)) {
            throw new NotFoundHttpException('Institution type not found');
        }

        if ($slug != $unitType->getSlug()) {
            return $this->redirect($this->typeUrlGenerator->getUrl($unitType), 301);
        }

        $this->breadcrumbBuilder->addBreadcrumbItem($unitType->getName());
        $this->initSeo($unitType);

        $areas = $this->areaRepo->findWithUnitsByParams($unitType->getId());
        $units = $this->unitRepo->getByUnitType($unitType->getId());

        return $this->render('unit_type/index.html.twig', [
            'units' => $units,
            'unitType' => $unitType,
            'areas' => $areas,
            'numUnits' => count($units),
        ]);
    }

    private function initSeo(InstitutionUnitType $unitType)
    {
        $params = [
            '%name%' => $unitType->getName(),
        ];

        $this->seoGenerator
            ->setTitle($this->translator->trans('unit_type.title', $params, 'seo'))
            ->setDescription($this->translator->trans('unit_type.description', $params, 'seo'))
            ->setKeywords($this->translator->trans('unit_type.keywords', $params, 'seo'))
        ;
    }
}

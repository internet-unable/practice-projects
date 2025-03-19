<?php

namespace App\Controller;

use App\Entity\Area;
use App\Menu\BreadcrumbBuilder;
use App\Repository\AreaRepository;
use App\Repository\CityRepository;
use App\Repository\DistrictRepository;
use App\Repository\Institution\InstitutionUnitRepository;
use App\Seo\SeoGenerator;
use App\Service\TerritorialUnitNameFormatter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\Translation\TranslatorInterface;

class AreaController extends AbstractController
{
    public function __construct(
        private readonly AreaRepository $areaRepository,
        private readonly DistrictRepository $districtRepository,
        private readonly CityRepository $cityRepository,
        private readonly InstitutionUnitRepository $unitRepository,
        private readonly BreadcrumbBuilder $breadcrumbBuilder,
        private readonly SeoGenerator $seoGenerator,
        private readonly TerritorialUnitNameFormatter $nameFormatter,
        private readonly TranslatorInterface $translator,
    ){}

    # [Route('/area/{id}/', name: 'area_page')]
    public function areaPage(int $id): Response
    {
        if (!$area = $this->areaRepository->getOneById($id)) {
            throw new NotFoundHttpException('Area not found');
        }

        $this->breadcrumbBuilder->addTerritorialUnitBreadcrumb($area);
        $this->initSeo($area);

        $districts = $this->districtRepository->findWithUnitsByParams(areaId: $area->getId());
        $cities = $this->cityRepository->findWithUnitsByParams(areaId: $area->getId());
        $numUnits = $this->unitRepository->countAllByParams(areaId: $area->getId());

        return $this->render('area/index.html.twig', [
            'area' => $area,
            'districts' => $districts,
            'cities' => $cities,
            'numUnits' => $numUnits,
        ]);
    }

    private function initSeo(Area $area)
    {
        $name = $this->nameFormatter->getName($area);

        $this->seoGenerator
            ->setTitle($this->translator->trans('area.title', ['%name%' => $name], 'seo'))
            ->setDescription($this->translator->trans('area.description', ['%name%' => $name], 'seo'))
            ->setKeywords($this->translator->trans('area.keywords', ['%name%' => $name], 'seo'))
        ;
    }
}

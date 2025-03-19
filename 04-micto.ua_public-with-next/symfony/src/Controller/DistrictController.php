<?php

namespace App\Controller;

use App\Entity\District;
use App\Menu\BreadcrumbBuilder;
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

class DistrictController extends AbstractController
{
    public function __construct(
        private readonly DistrictRepository $districtRepository,
        private readonly CityRepository $cityRepository,
        private readonly InstitutionUnitRepository $unitRepository,
        private readonly BreadcrumbBuilder $breadcrumbBuilder,
        private readonly SeoGenerator $seoGenerator,
        private readonly TerritorialUnitNameFormatter $nameFormatter,
        private readonly TranslatorInterface $translator,
    ){}

    # [Route('/district/{id}/', name: 'district_page')]
    public function districtPage(int $id): Response
    {
        if (!$district = $this->districtRepository->getOneById($id)) {
            throw new NotFoundHttpException('District not found');
        }

        $this->breadcrumbBuilder->addTerritorialUnitBreadcrumb($district);
        $this->initSeo($district);
        $numUnits = $this->unitRepository->countAllByParams(districtIds: [$district->getId()]);

        $cities = $this->cityRepository->findWithUnitsByParams(districtId: $district->getId());

        return $this->render('district/index.html.twig', [
            'district' => $district,
            'cities' => $cities,
            'numUnits' => $numUnits,
        ]);
    }

    private function initSeo(District $district)
    {
        $name = $this->nameFormatter->getName($district);

        $this->seoGenerator
            ->setTitle($this->translator->trans('district.title', ['%name%' => $name], 'seo'))
            ->setDescription($this->translator->trans('district.description', ['%name%' => $name], 'seo'))
            ->setKeywords($this->translator->trans('district.keywords', ['%name%' => $name], 'seo'))
        ;
    }
}

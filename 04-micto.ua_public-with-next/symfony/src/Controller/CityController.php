<?php

namespace App\Controller;

use App\Entity\City;
use App\Entity\CityDistrict;
use App\Entity\CityType;
use App\Menu\BreadcrumbBuilder;
use App\Repository\CityDistrictRepository;
use App\Repository\CityRepository;
use App\Repository\Institution\InstitutionRepository;
use App\Seo\SchemaOrgGenerator;
use App\Seo\SeoGenerator;
use App\Service\TerritorialUnitNameFormatter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\Translation\TranslatorInterface;

class CityController extends AbstractController
{
    public function __construct(
        private readonly CityRepository $cityRepository,
        private readonly CityDistrictRepository $cityDistrictRepo,
        private readonly InstitutionRepository $institutionRepo,
        private readonly BreadcrumbBuilder $breadcrumbBuilder,
        private readonly SeoGenerator $seoGenerator,
        private readonly SchemaOrgGenerator $schemaOrgGenerator,
        private readonly TerritorialUnitNameFormatter $nameFormatter,
        private readonly TranslatorInterface $translator,
    ){}

    # [Route('/city/{id}/', name: 'city_page')]
    public function cityPage(
        string $id,
    ): Response
    {
        if (!$city = $this->cityRepository->findOneById($id)) {
            throw new NotFoundHttpException('City not found');
        }

        $this->breadcrumbBuilder->addTerritorialUnitBreadcrumb($city);
        $this->initCitySeo($city);

        $cityDistricts = $this->cityDistrictRepo->findWithUnitsByParams(cityId: $city->getId());

        $institutions = $this->institutionRepo->findByCityId($city->getId());
        $numUnits = count($institutions);

        $this->schemaOrgGenerator->addSchemaForCity($city, $institutions);

        return $this->render('city/index.html.twig', [
            'city' => $city,
            'cityDistricts' => $cityDistricts,
            'institutions' => $institutions,
            'numUnits' => $numUnits,
        ]);
    }

    # [Route('/city-district/{id}/', name: 'city_district_page')]
    public function cityDistrictPage(
        int $id,
    ): Response
    {
        if (!$cityDistrict = $this->cityDistrictRepo->findOneById($id)) {
            throw new NotFoundHttpException('City district not found');
        }

        $this->breadcrumbBuilder->addTerritorialUnitBreadcrumb($cityDistrict);
        $this->initCityDistrictSeo($cityDistrict);

        $institutions = $this->institutionRepo->findByCityDistrictId($cityDistrict->getId());
        $numUnits = count($institutions);

        $city = $cityDistrict->getCity();

        return $this->render('city/city_district.html.twig', [
            'cityDistrict' => $cityDistrict,
            'institutions' => $institutions,
            'city' => $city,
            'numUnits' => $numUnits,
        ]);
    }

    private function initCitySeo(City $city)
    {
        $name = [
            $this->nameFormatter->getName($city),
        ];

        if (CityType::SPECIAL != $city->getType() && $city->getDistrict()) {
            $name[] = $this->nameFormatter->getName($city->getDistrict());
        }

        $name[] = $this->nameFormatter->getName($city->getArea());
        $name = implode(' ', $name);

        $this->seoGenerator
            ->setTitle($this->translator->trans('city.title', ['%name%' => $name], 'seo'))
            ->setDescription($this->translator->trans('city.description', ['%name%' => $name], 'seo'))
            ->setKeywords($this->translator->trans('city.keywords', ['%name%' => $name], 'seo'))
        ;
    }

    private function initCityDistrictSeo(CityDistrict $cityDistrict)
    {
        $name = $this->nameFormatter->getName($cityDistrict);

        $this->seoGenerator
            ->setTitle($this->translator->trans('city_district.title', ['%name%' => $name], 'seo'))
            ->setDescription($this->translator->trans('city_district.description', ['%name%' => $name], 'seo'))
            ->setKeywords($this->translator->trans('city_district.keywords', ['%name%' => $name], 'seo'))
        ;
    }
}

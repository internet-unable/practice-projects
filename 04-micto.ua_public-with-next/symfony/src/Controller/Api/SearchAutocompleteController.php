<?php

namespace App\Controller\Api;

use App\Components\ApiResponse;
use App\Entity\CityType;
use App\Repository\AreaRepository;
use App\Repository\CityRepository;
use App\Repository\DistrictRepository;
use App\Repository\Institution\InstitutionUnitRepository;
use App\Repository\Institution\InstitutionUnitTypeRepository;
use App\Seo\SeoGenerator;
use App\Service\Institution\InstitutionUnitUrlGenerator;
use App\Service\Institution\UnitTypeUrlGenerator;
use App\Service\TerritorialUnitNameFormatter;
use App\Service\TerritorialUnitUrlGenerator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class SearchAutocompleteController extends AbstractController
{
    public function __construct(
        private readonly InstitutionUnitRepository $unitRepo,
        private readonly InstitutionUnitTypeRepository $unitTypeRepo,
        private readonly CityRepository $cityRepo,
        private readonly DistrictRepository $districtRepo,
        private readonly AreaRepository $areaRepo,
        private readonly TerritorialUnitNameFormatter $nameFormatter,
        private readonly TerritorialUnitUrlGenerator $urlGenerator,
        private readonly UnitTypeUrlGenerator $typeUrlGenerator,
        private readonly SeoGenerator $seoGenerator,
        private readonly InstitutionUnitUrlGenerator $unitUrlGenerator,
    ) {}

    #[Route('/api/autocomplete/', 'api_search_autocomplete')]
    public function search(Request $request): Response
    {
        $result = [
            'categories' => [],
            'types' => [],
            'units' => [],
        ];

        $q = trim($request->get('q', ''));

        if (2 > mb_strlen($q)) {
            return (new ApiResponse())->setResult(false)->setData($result);
        }

        $result['types'] = $this->searchUnitTypes($q);
        $result['units'] = $this->searchUnits($q);
        $result['categories'] = $this->searchTerritorialUnits($q);


        $isEmpty = empty(array_filter($result));

        return (new ApiResponse())->setResult(!$isEmpty)->setData($result);
    }

    private function searchUnitTypes(string $searchQuery): array
    {
        $result = [];

        foreach ($this->unitTypeRepo->findWithUnitsByName($searchQuery) as $unitType) {
            $result[] = [
                'name' => $unitType->getName(),
                'link' => $this->typeUrlGenerator->getUrl($unitType),
            ];
        }

        return $result;
    }

    private function searchUnits(string $searchQuery): array
    {
        $result = [];

        foreach ($this->unitRepo->findByName($searchQuery) as $unit) {
            $result[] = [
                'name' => $unit->getName(),
                'link' => $this->unitUrlGenerator->getUrl($unit),
            ];
        }

        return $result;
    }

    private function searchTerritorialUnits(string $searchQuery): array
    {
        $areas = [];

        foreach ($this->areaRepo->findWithUnitsByParams(name: $searchQuery, limit: 2) as $area) {
            $areas[] = [
                'name' => $this->nameFormatter->getName($area),
                'link' => $this->urlGenerator->getUrl($area),
            ];
        }

        $disctricts = [];

        foreach ($this->districtRepo->findWithUnitsByParams(name: $searchQuery, limit: 2) as $district) {
            $disctricts[] = [
                'name' => sprintf(
                    '%s (%s)',
                    $this->nameFormatter->getName($district),
                    $this->nameFormatter->getName($district->getArea())
                ),
                'link' => $this->urlGenerator->getUrl($district),
            ];
        }

        $cities = [];
        $limit = 5 - count($areas)-count($disctricts);

        foreach ($this->cityRepo->findWithUnitsByParams(name: $searchQuery, limit: $limit) as $city) {
            $cities[] = [
                'name' => CityType::SPECIAL == $city->getType() ?
                    $this->nameFormatter->getName($city)
                    : sprintf(
                        '%s (%s%s)',
                        $this->nameFormatter->getName($city),
                        $this->nameFormatter->getName($city->getArea()),
                        $city->getDistrict() ? ', '.$this->nameFormatter->getName($city->getDistrict()) : ''
                    ),
                'link' => $this->urlGenerator->getUrl($city),
            ];
        }

        return [...$areas, ...$cities, ...$disctricts];
    }
}

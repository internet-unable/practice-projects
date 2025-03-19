<?php

namespace App\Controller;

use App\Entity\CityType;
use App\Repository\AreaRepository;
use App\Repository\CityRepository;
use App\Repository\DistrictRepository;
use App\Repository\Institution\InstitutionUnitRepository;
use App\Repository\Institution\InstitutionUnitTypeRepository;
use App\Seo\SeoGenerator;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class SearchController extends AbstractController
{
    const NUM_ON_PAGE = 20;

    public function __construct(
        private readonly InstitutionUnitRepository $unitRepo,
        private readonly InstitutionUnitTypeRepository $unitTypeRepo,
        private readonly CityRepository $cityRepo,
        private readonly DistrictRepository $districtRepo,
        private readonly AreaRepository $areaRepo,
        private readonly SeoGenerator $seoGenerator,
    ) {}

    #[Route('/search/', 'search_page')]
    public function searchPage(
        PaginatorInterface $paginator,
        Request $request
    ): Response
    {
        $this->seoGenerator->setTitle('Результати пошуку - Місто.юа');

        $q = $request->get('q');
        $page = (int)$request->get('page', 1);

        $count = $this->count((string)$q);
        $total = array_sum($count);

        $pagination = $paginator->paginate(
            [],
            $page > 0 ? $page : 1,
            self::NUM_ON_PAGE,
            ['totalCount' => $total]
        );

        return $this->render('search/index.html.twig', [
            'searchQuery' => $q,
            'pagination' => $pagination,
            'result' => $this->getSearchData(
                $q,
                $this->calculateOffsetsAndLimits($count, $pagination->getCurrentPageNumber())
            ),
        ]);
    }

    private function count(string $queryString): array
    {
        $result = [
            'areas' => 0,
            'cities' => 0,
            'districts' => 0,
            'types' => 0,
            'units' => 0,
        ];

        if (2 > mb_strlen(trim($queryString))) {
            return $result;
        }

        $result['areas'] = $this->areaRepo->countAllWithUnitsByParams(name: $queryString);
        $result['cities'] = $this->cityRepo->countAllWithUnitsByParams(name: $queryString);
        $result['districts'] = $this->districtRepo->countAllWithUnitsByParams(name: $queryString);
        $result['types'] = $this->unitTypeRepo->countWithUnitsByName(name: $queryString);
        $result['units'] = $this->unitRepo->countByName(name: $queryString);

        return $result;
    }

    private function getSearchData(
        string $queryString,
        array $offsetsNadLimits,
    ): array
    {
        $result = [
            'areas' => [],
            'cities' => [],
            'districts' => [],
            'types' => [],
            'units' => [],
        ];

        foreach ($offsetsNadLimits as $key => $params) {
            if (!$params['limit']) {
                continue;
            }

            $result[$key] = match($key) {
                'areas' => $this->areaRepo->findWithUnitsByParams(
                    name: $queryString,
                    limit: $params['limit'],
                    offset: $params['offset'],
                ),
                'cities' => $this->cityRepo->findWithUnitsByParams(
                    name: $queryString,
                    limit: $params['limit'],
                    offset: $params['offset'],
                ),
                'districts' => $this->districtRepo->findWithUnitsByParams(
                    name: $queryString,
                    limit: $params['limit'],
                    offset: $params['offset'],
                ),
                'types' => $this->unitTypeRepo->findWithUnitsByName(
                    name: $queryString,
                    limit: $params['limit'],
                    offset: $params['offset'],
                ),
                'units' => $this->unitRepo->findByName(
                    name: $queryString,
                    limit: $params['limit'],
                    offset: $params['offset'],
                ),
            };
        }

        return $result;
    }

    private function calculateOffsetsAndLimits($countResults, int $currentPage = 1): array
    {
        $offsetsAndLimits = [];
        $start = ($currentPage - 1) * self::NUM_ON_PAGE;
        $end = $currentPage * self::NUM_ON_PAGE;

        $currentOffset = 0;

        foreach ($countResults as $type => $count) {
            if ($start < $currentOffset + $count) {
                $typeOffset = max(0, $start - $currentOffset);
                $typeLimit = min($count - $typeOffset, $end - $start);
                $offsetsAndLimits[$type] = [
                    'offset' => $typeOffset,
                    'limit' => $typeLimit
                ];
                $start += $typeLimit;
            }

            $currentOffset += $count;
        }

        return $offsetsAndLimits;
    }
}

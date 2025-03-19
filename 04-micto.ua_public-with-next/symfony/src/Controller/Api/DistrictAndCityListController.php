<?php

namespace App\Controller\Api;

use App\Components\ApiResponse;
use App\Entity\CityType;
use App\Repository\CityRepository;
use App\Repository\DistrictRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class DistrictAndCityListController extends AbstractController
{
    public function __construct(
        private readonly DistrictRepository $districtRepo,
        private readonly CityRepository $cityRepo,
    ) {}

    #[Route('/api/district-city/list', name: 'api_district_city_list')]
    public function getList(Request $request): Response
    {
        $areaId = (int)$request->get('area');
        $typeId = (int)$request->get('type');

        return (new ApiResponse())
            ->setData([
                'html' => $this->renderView('components/filter/district_and_city_list.html.twig', [
                    'cities' => $this->cityRepo->findWithUnitsByParams(
                        areaId: $areaId,
                        unitTypeId: $typeId,
                        cityTypes: [
                            CityType::SPECIAL,
                            CityType::CITY,
                        ],
                    ),
                    'districts' => $this->districtRepo->findWithUnitsByParams(
                        areaId: $areaId,
                        unitTypeId: $typeId,
                    ),
                    'typeId' => $typeId,
                    'areaId' => $areaId,
                ]),
            ]);
    }
}

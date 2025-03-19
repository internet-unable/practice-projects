<?php

namespace App\Controller\Api;

use App\Components\ApiResponse;
use App\Repository\Institution\InstitutionUnitRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class InstitutionUnitListController extends AbstractController
{
    public function __construct(
        private readonly InstitutionUnitRepository $unitRepo,
    ) {}

    #[Route('/api/unit/list', name: 'api_unit_list')]
    public function getInstitutionList(Request $request): Response
    {
        $areaId = (int)$request->get('area');
        $typeId = (int)$request->get('type');
        $cityIds = $request->get('city');
        $cityIds = is_array($cityIds) ? array_filter($cityIds) : [];
        $districtIds = $request->get('district');
        $districtIds = is_array($districtIds) ? array_filter($districtIds) : [];

        return (new ApiResponse())
            ->setData([
                'html' => $this->renderView('components/unit/list.html.twig', [
                    'units' => $this->unitRepo->findAllByParams(
                        areaId: $areaId,
                        unitTypeId: $typeId,
                        cityIds: $cityIds,
                        districtIds: $districtIds,
                    ),
                ]),
            ]);
    }
}

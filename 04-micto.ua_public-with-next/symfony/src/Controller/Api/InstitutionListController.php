<?php

namespace App\Controller\Api;

use App\Components\ApiResponse;
use App\Repository\Institution\InstitutionRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class InstitutionListController extends AbstractController
{
    public function __construct(
        private readonly InstitutionRepository $institutionRepo,
    ) {}

    #[Route('/api/institution/list', name: 'api_institution_list')]
    public function getInstitutionList(Request $request): Response
    {
        $cityId = (int)$request->get('cityId');
        $cityDistrictId = (int)$request->get('cityDistrictId');
        $types = $request->get('institutionType') ?: [];

        if ($cityDistrictId) {
            $institutions = $this->institutionRepo->findByCityDistrictId($cityDistrictId, $types);
        } else {
            $institutions = $this->institutionRepo->findByCityId($cityId, $types);
        }

        return (new ApiResponse())
            ->setData([
                'html' => $this->renderView('components/institution/list.html.twig', [
                    'institutions' => $institutions,
                ]),
            ]);
    }
}

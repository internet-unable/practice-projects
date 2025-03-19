<?php

namespace App\Controller;

use App\Entity\CommentType;
use App\Repository\AreaRepository;
use App\Repository\CityRepository;
use App\Repository\CommentRepository;
use App\Repository\Institution\InstitutionUnitDepartmentRepository;
use App\Repository\Institution\InstitutionUnitRepository;
use App\Service\Institution\UnitTypeService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class IndexController extends AbstractController
{
    public function __construct(
        private readonly AreaRepository $areaRepo,
        private readonly CityRepository $cityRepo,
        private readonly UnitTypeService $unitTypeService,
        private readonly InstitutionUnitRepository $unitRepo,
        private readonly InstitutionUnitDepartmentRepository $unitDepartmentRepo,
        private readonly CommentRepository $commentRepo,
    ){}

    #[Route('/', name: 'home', options: ['sitemap' => ['priority' => 1.0]])]
    public function index(): Response
    {
        $numUnits = $this->unitRepo->countAllByParams();
        $numUnits = floor($numUnits/100)*100;

        $numDepartments = $this->unitDepartmentRepo->countAllActive();
        $numDepartments = floor($numDepartments/100)*100;

        $numComments = $this->commentRepo->countCommentsByParams(
            types: [
                CommentType::QUESTION,
                CommentType::REVIEW,
                CommentType::COMPLAINT,
                CommentType::GRATITUDE,
            ],
        );
        $numComments = floor($numComments/100)*100;

        return $this->render('index/index.html.twig', [
            'areas' => $this->areaRepo->findAll(),
            'areaCenters' => $this->cityRepo->findAreaCenters(),
            'unitTypes' => $this->unitTypeService->getAllWithAlphabeticalIndex(),
            'numUnits' => $numUnits,
            'numDepartments' => $numDepartments,
            'numComments' => $numComments,
        ]);
    }
}

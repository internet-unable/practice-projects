<?php

namespace App\Controller\Cabinet;

use App\Repository\Institution\InstitutionRepository;
use App\Repository\Institution\InstitutionUnitDepartmentRepository;
use App\Repository\Institution\InstitutionUnitRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[IsGranted('INSTITUTION_MANAGER')]
class InstitutionController extends AbstractController
{
    public function __construct(
        private readonly InstitutionRepository $institutionRepo,
        private readonly InstitutionUnitRepository $unitRepo,
        private readonly InstitutionUnitDepartmentRepository $unitDepartmentRepo,
    ){}

    #[Route('/cabinet/institutions', name: 'cabinet_institutions_page')]
    public function institutionList(): Response
    {
        $institutions = $this->institutionRepo->getForUser($this->getUser()->getId());
        $institutionUnits = $this->unitRepo->getForUser($this->getUser()->getId());
        $institutionUnitDepartments = $this->unitDepartmentRepo->getForUser($this->getUser()->getId());

        return $this->render('cabinet/institution/institutions_list.html.twig', [
            'institutions' => $institutions,
            'institutionUnits' => $institutionUnits,
            'institutionUnitDepartments' => $institutionUnitDepartments,
        ]);
    }
}

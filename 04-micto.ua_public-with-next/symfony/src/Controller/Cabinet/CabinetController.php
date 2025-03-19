<?php

namespace App\Controller\Cabinet;

use App\Router\UserRouter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

class CabinetController extends AbstractController
{
    public function __construct(
        private readonly UserRouter $userRouter,
    ){}

    #[IsGranted('ROLE_USER')]
    #[Route('/cabinet', name: 'cabinet')]
    public function index(): Response
    {
        return $this->render('cabinet/cabinet_react.html.twig');
    }

    #[IsGranted('INSTITUTION_MANAGER')]
    #[Route('/cabinet/institution', name: 'institution_cabinet')]
    public function institutionCabinet(): Response
    {
        $user = $this->getUser();

        return $this->render('cabinet/institution/info_edit_page.html.twig', [
            'user' => $user,
        ]);
    }

    #[IsGranted('PATIENT')]
    #[Route('/cabinet/patient', name: 'patient_cabinet')]
    public function patientCabinet(): Response
    {
        $user = $this->getUser();

        return $this->render('cabinet/patient/profile_edit_page.html.twig', [
            'user' => $user,
        ]);
    }
}

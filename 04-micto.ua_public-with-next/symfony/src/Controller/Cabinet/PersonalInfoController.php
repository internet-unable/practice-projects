<?php

namespace App\Controller\Cabinet;

use App\Controller\Cabinet\Form\UserProfileForm;
use App\Service\ProfileService;
use SoftUa\UserBundle\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[IsGranted('ROLE_USER')]
class PersonalInfoController extends AbstractController
{
    public function __construct(
        private readonly ProfileService $profileService,
    ){}

    #[Route('/cabinet/personal', name: 'personal_info_page')]
    public function personalInfo(): Response
    {
        return $this->redirectToRoute('cabinet');
    }

    #[Route('/cabinet/settings', name: 'cabinet_settings')]
    public function cabinetSettings(): Response
    {
        return $this->redirectToRoute('cabinet');
    }

    #[Route('/cabinet/personal/edit', name: 'personal_edit_page')]
    public function personalEdit(RequestStack $requestStack): Response
    {
        $request = $requestStack->getCurrentRequest();
        /** @var User $user */
        $user = $this->getUser();

        $data = [
            'user' => $user,
            'doctorProfile' => $this->profileService->getDoctorProfile($user->getId()),
        ];

        $form = $this->createForm(UserProfileForm::class, data: $data);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->profileService->saveUserData($form->getData());

            return $this->redirectToRoute('personal_info_page'); // personal_info_page
        }

        return $this->render('cabinet/personal/personal_info_edit.html.twig', [
            'user' => $this->getUser(),
            'form' => $form->createView(),
        ]);
    }
}

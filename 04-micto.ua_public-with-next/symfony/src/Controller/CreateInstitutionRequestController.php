<?php

namespace App\Controller;

use App\Form\CreateInstitutionRequestFormType;
use App\Service\MailerService;
use App\Components\ApiResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class CreateInstitutionRequestController extends AbstractController
{
    public function __construct(
        private readonly MailerService $mailerService,
    ) {}

    #[Route('/institution/add/', 'institution_request_page')]
    public function createInstitutionPage(
        Request $request,
        SessionInterface $session,
    ): Response
    {
        $form = $this->createForm(CreateInstitutionRequestFormType::class);
        $form->handleRequest($request);

        return $this->render('institution/create_institution_request.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    #[Route('api/institution/add/', 'create_institution_request')]
    public function createInstitution(
        Request $request,
        SessionInterface $session,
    ): Response
    {
        $form = $this->createForm(CreateInstitutionRequestFormType::class);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->mailerService->sendTplEmail(
                subject: 'Запит на додавання мед. закладу',
                tpl: '/mail/new_institution.html.twig',
                tplParams: ['formData' => $form->getData()]
            );


            $session->set('is_institution_created', true);

            return (
                new ApiResponse())
                    ->setResult(true)
                    ->setData([
                        'redirectUrl' => $this->generateUrl('success_page', [], UrlGeneratorInterface::ABSOLUTE_URL),
                    ]);
        }

        $formHtml = $this->render("institution/create_institution_request_form.html.twig", [
            'form' => $form->createView(),
        ])->getContent();

        return (new ApiResponse())
            ->setResult(false)
            ->setData([
                'html' => $formHtml,
        ]);
    }

    #[Route('/institution/create-success/', 'create_institution_request_success_page')]
    public function createInstitutionSuccess(
        SessionInterface $session,
    ): Response
    {
        if (!$session->get('is_institution_created')) {
            return $this->redirectToRoute('home');
        }

        return $this->render('institution/create_institution_request_success.html.twig');
    }

    public function getForm(): Response
    {
        $form = $this->createForm(CreateInstitutionRequestFormType::class);

        return $this->render('institution/create_institution_request_form.html.twig', [
            'form' => $form->createView(),
        ]);
    }
}

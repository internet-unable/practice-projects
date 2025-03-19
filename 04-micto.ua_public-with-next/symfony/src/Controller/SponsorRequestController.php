<?php

namespace App\Controller;

use App\Components\ApiResponse;
use App\Form\SponsorRequestFormType;
use App\Service\MailerService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class SponsorRequestController extends AbstractController
{
    public function __construct(
        private readonly MailerService $mailerService,
    ) {}

    #[Route('/api/sponsor/create-request', 'create_sponsor_request')]
    public function handleFormSubmission(Request $request): Response
    {
        $form = $this->createForm(SponsorRequestFormType::class);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->mailerService->sendTplEmail(
                subject: 'Запит інвестора',
                tpl: '/mail/sponsor_request.html.twig',
                tplParams: ['formData' => $form->getData()]
            );

            return (new ApiResponse())->setResult(true);
        } else {
            $formHtml = $this->render("sponsor/sponsor_form.html.twig", [
                'form' => $form->createView(),
            ])->getContent();

            return (new ApiResponse())
                ->setResult(false)
                ->setData([
                    'html' => $formHtml,
                ]);
        }
    }

    public function getForm(): Response
    {
        $form = $this->createForm(SponsorRequestFormType::class);

        return $this->render('sponsor/sponsor_modal.html.twig', [
            'form' => $form->createView(),
        ]);
    }
}

<?php

namespace App\Controller;

use App\Components\ApiResponse;
use App\Form\InvestorRequestFormType;
use App\Service\MailerService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class InvestorRequestController extends AbstractController
{
    public function __construct(
        private readonly MailerService $mailerService,
    ) {}

    #[Route('/api/investor/create-request', 'create_investor_request')]
    public function handleFormSubmission(Request $request): Response
    {
        $form = $this->createForm(InvestorRequestFormType::class);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->mailerService->sendTplEmail(
                subject: 'Запит інвестора',
                tpl: '/mail/investor_request.html.twig',
                tplParams: ['formData' => $form->getData()]
            );

            return (new ApiResponse())->setResult(true);
        } else {
            $formHtml = $this->render("investor/investor_form.html.twig", [
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
        $form = $this->createForm(InvestorRequestFormType::class);

        return $this->render('investor/investor_modal.html.twig', [
            'form' => $form->createView(),
        ]);
    }
}

<?php

namespace App\Controller;

use App\Components\ApiResponse;
use App\Form\PsychologistRequestFormType;
use App\Service\MailerService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class PsychologistRequestController extends AbstractController
{
    public function __construct(
        private readonly MailerService $mailerService,
    ) {}

    #[Route('/api/psychologist/create-request', 'create_psychologist_request')]
    public function handleFormSubmission(Request $request): Response
    {
        $form = $this->createForm(PsychologistRequestFormType::class);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            
            $this->mailerService->sendTplEmail(
                subject: 'Психолог. Запит на прийом',
                tpl: '/mail/psychologist_request.html.twig',
                tplParams: ['formData' => $form->getData()]
            );

            return (new ApiResponse())
                ->setResult(true)
                ->setData([
                    'redirectUrl' => $this->generateUrl('psychologist_success_page', [], UrlGeneratorInterface::ABSOLUTE_URL),
                ]);
        } else {
            $formHtml = $this->render("form/psychologist/psychologist_form.html.twig", [
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
        $form = $this->createForm(PsychologistRequestFormType::class);
        
        return $this->render('form/psychologist/psychologist_form.html.twig', [
            'form' => $form->createView(),
        ]);
    }
}

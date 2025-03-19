<?php

namespace App\Controller;

use App\Components\ApiResponse;
use App\Entity\Institution\Institution;
use App\Entity\Institution\InstitutionUnit;
use App\Entity\Institution\InstitutionUnitDepartment;
use App\Form\NotifyFormType;
use App\Repository\Institution\InstitutionRepository;
use App\Repository\Institution\InstitutionUnitDepartmentRepository;
use App\Repository\Institution\InstitutionUnitRepository;
use App\Service\Institution\InstitutionUnitUrlGenerator;
use App\Service\Institution\InstitutionUrlGenerator;
use App\Service\Institution\UnitDepartmentUrlGenerator;
use App\Service\MailerService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\FormError;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class CreateNotifyRequestController extends AbstractController
{
    public function __construct(
        private readonly InstitutionRepository $institutionRepo,
        private readonly InstitutionUrlGenerator $institutionUrlGenerator,
        private readonly InstitutionUnitRepository $unitRepo,
        private readonly InstitutionUnitUrlGenerator $unitUrlGenerator,
        private readonly InstitutionUnitDepartmentRepository $unitDepartmentRepo,
        private readonly UnitDepartmentUrlGenerator $unitDepartmentUrlGenerator,
        private readonly MailerService $mailerService,
    ){}

    #[Route('/api/notify/create/', 'api_create_notify')]
    public function reviewCreate(Request $request): Response
    {
        $form = $this->createForm(NotifyFormType::class);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $institutionData = $this->getInstitutionData(
                $form->getData()
            );

            if ($institutionData) {
                $this->mailerService->sendTplEmail(
                    subject: 'Запит на оновлення інформації про заклад',
                    tpl: '/mail/notify_request.html.twig',
                    tplParams: [
                        'formData' => $form->getData(),
                        'institutionData' => $institutionData,
                    ]
                );

                return new ApiResponse();
            }

            $form->addError(
                new FormError('Дані передано некоректно')
            );
        }

        $formHtml = $this->render('form/notify_request/form.html.twig', [
            'form' => $form->createView(),
        ])->getContent();

        return (new ApiResponse())
            ->setResult(false)
            ->setData([
                'html' => $formHtml,
            ]);
    }

    public function getForm(
        Institution|InstitutionUnit|InstitutionUnitDepartment $entity,
    ): Response
    {
        $entityType = match(true) {
            $entity instanceof Institution => NotifyFormType::ENTITY_TYPE_INSTITUTION,
            $entity instanceof InstitutionUnit => NotifyFormType::ENTITY_TYPE_UNIT,
            $entity instanceof InstitutionUnitDepartment => NotifyFormType::ENTITY_TYPE_DEPARTMENT,
            default => null,
        };

        $form = $this->createForm(NotifyFormType::class, [
            'entityId' => $entity->getId(),
            'entityType' => $entityType,
        ]);

        return $this->render('form/notify_request/form.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    private function getInstitutionData(array $formData): ?array
    {
        if (
            $formData['entityType'] == NotifyFormType::ENTITY_TYPE_INSTITUTION
            && $institution = $this->institutionRepo->getOneById($formData['entityId'])
        ) {
            return [
                'name' => $institution->getName(),
                'url' => $this->institutionUrlGenerator->getUrl($institution, true),
            ];
        } elseif (
            $formData['entityType'] == NotifyFormType::ENTITY_TYPE_UNIT
            && $unit = $this->unitRepo->getOneById($formData['entityId'])
        ) {
            return [
                'name' => $unit->getName(),
                'url' => $this->unitUrlGenerator->getUrl($unit, true),
            ];
        } elseif (
            $formData['entityType'] == NotifyFormType::ENTITY_TYPE_DEPARTMENT
            && $department = $this->unitDepartmentRepo->getOneById($formData['entityId'])
        ) {
            return [
                'name' => sprintf('%s - %s', $department->getUnit()->getName(), $department->getName()),
                'url' => $this->unitDepartmentUrlGenerator->getUrl($department, true),
            ];
        }

        return null;
    }
}

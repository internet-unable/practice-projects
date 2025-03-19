<?php

namespace App\Controller;

use App\Entity\CommentType;
use App\Entity\Institution\InstitutionUnitDepartment;
use App\Menu\BreadcrumbBuilder;
use App\Repository\CommentRepository;
use App\Repository\Institution\InstitutionUnitDepartmentRepository;
use App\Seo\SeoGenerator;
use App\Service\Institution\UnitDepartmentUrlGenerator;
use App\Service\Media\MediaService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Attribute\Route;

class UnitDepartmentController extends AbstractController
{
    public function __construct(
        private readonly InstitutionUnitDepartmentRepository $unitDepartmentRepo,
        private readonly BreadcrumbBuilder $breadcrumbBuilder,
        private readonly CommentRepository $commentRepo,
        private readonly SeoGenerator $seoGenerator,
        private readonly UnitDepartmentUrlGenerator $departmentUrlGenerator,
        private readonly MediaService $mediaService,
    ){}

    #[Route(
        '/{unitSlug}-i{unitId}/{slug}-s{id}/',
        name: 'unit_department_page',
        requirements: [
            'id' => '\d+',
            'slug' => '[\w\d\-_]+',
            'unitSlug' => '[\w\d\-_]+',
            'unitId' => '\d+',
        ]
    )]
    public function unitDepartmentPage(
        int $id,
        string $slug,
        int $unitId,
        string $unitSlug,
    ): Response
    {
        if (!$unitDepartment = $this->unitDepartmentRepo->getOneByOldId($id)) {
            throw new NotFoundHttpException('Unit department not found');
        }

        if (
            $unitDepartment->getSlug() != $slug
            || $unitDepartment->getUnit()->getSlug() != $unitSlug
            || $unitDepartment->getUnit()->getOldId() != $unitId
        ) {
            return $this->redirect($this->departmentUrlGenerator->getUrl($unitDepartment), 301);
        }

        $this->initBreadcrumb($unitDepartment);
        $this->initSeo($unitDepartment);

        $departments = $unitDepartment->getUnit()->getDepartments()->filter(
            function ($department) use ($unitDepartment) {
                return $department->getId() != $unitDepartment->getId();
            }
        );

        return $this->render('unit_department/unit_department_page.html.twig', [
            'unitDepartment' => $unitDepartment,
            'image' => $this->getImage($unitDepartment),
            'departments' => $departments->toArray(),
            'numComments' => $this->commentRepo->countCommentsByParams(
                entity: $unitDepartment,
                types: [
                    CommentType::GRATITUDE,
                    CommentType::COMPLAINT,
                    CommentType::REVIEW,
                ],
            ),
        ]);
    }

    private function initBreadcrumb(InstitutionUnitDepartment $department)
    {
        $unit = $department->getUnit();

        $this->breadcrumbBuilder->addTerritorialUnitBreadcrumb(
            $unit->getCityDistrict() ?? $unit->getCity(),
            true
        );

        $institution = $unit->getInstitution();

        if ($institution->isHasSeveralUnits()) {
            $this->breadcrumbBuilder->addInstitutionBreadcrumbItem($institution);
        }

        $this->breadcrumbBuilder->addInstitutionUnitBreadcrumbItem($unit);

        $this->breadcrumbBuilder->addBreadcrumbItem($department->getName());
    }

    private function initSeo(InstitutionUnitDepartment $department)
    {
        $unit = $department->getUnit();

        $title = array_filter([
            $department->getName(),
            $unit->getName(),
            $unit->getEdrpou(),
            $unit->getType()?->getName()
        ]);

        $desc = array_filter([
            $unit->getName(),
            $unit->getAddress()?->getAddress(),
            $unit->getType()?->getName()
        ]);

        $keywords = array_filter([
            $department->getName(),
            $unit->getName(),
            $unit->getEdrpou(),
            $unit->getAddress()?->getAddress(),
            $unit->getType()?->getName()
        ]);

        $this->seoGenerator
            ->setTitle(sprintf('%s ▪ МІСТО.юа', implode(' ▪ ', $title)))
            ->setDescription(sprintf(
                'Інформація про відділення %s медичного закладу %s',
                $department->getName(),
                implode(', ', $desc)
            ))
            ->setKeywords(implode(', ', $keywords))
        ;
    }

    private function getImage(InstitutionUnitDepartment $department): ?string
    {
        $images = $this->mediaService->getGalleryMedia($department);

        $image = current($images);

        if (!$image) {
            return null;
        }

        return $this->mediaService->getUrl($image);
    }
}

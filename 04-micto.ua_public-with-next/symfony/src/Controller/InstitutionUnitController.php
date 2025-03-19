<?php

namespace App\Controller;

use App\Entity\CommentType;
use App\Entity\Institution\InstitutionUnit;
use App\Menu\BreadcrumbBuilder;
use App\Repository\CommentRepository;
use App\Repository\Institution\InstitutionUnitDepartmentRepository;
use App\Repository\Institution\InstitutionUnitRepository;
use App\Seo\SchemaOrgGenerator;
use App\Seo\SeoGenerator;
use App\Service\Institution\InstitutionUnitUrlGenerator;
use App\Service\Media\MediaService;
use App\Service\TerritorialUnitNameFormatter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Contracts\Translation\TranslatorInterface;

class InstitutionUnitController extends AbstractController
{
    public function __construct(
        private readonly InstitutionUnitRepository $institutionUnitRepo,
        private readonly InstitutionUnitDepartmentRepository $unitDepartmentRepo,
        private readonly CommentRepository $commentRepo,
        private readonly BreadcrumbBuilder $breadcrumbBuilder,
        private readonly SeoGenerator $seoGenerator,
        private readonly SchemaOrgGenerator $schemaOrgGenerator,
        private readonly InstitutionUnitUrlGenerator $unitUrlGenerator,
        private readonly TerritorialUnitNameFormatter $tuNameFormatter,
        private readonly TranslatorInterface $translator,
        private readonly MediaService $mediaService,
    ){}

    #[Route(
        '/{slug}-i{id}/',
        name: 'institution_unit_page',
        requirements: [
            'id' => '\d+',
            'slug' => '[\w\d\-_]+',
        ]
    )]
    public function institutionUnitPage(int $id, string $slug): Response
    {
        if (!$institutionUnit = $this->institutionUnitRepo->getOneByOldId($id)) {
            throw new NotFoundHttpException('Institution unit not found');
        }

        if ($slug != $institutionUnit->getSlug()) {
            return $this->redirect($this->unitUrlGenerator->getUrl($institutionUnit), 301);
        }

        $this->initBreadcrumb($institutionUnit);
        $this->initSeo($institutionUnit);

        $unitDepartments = $this->unitDepartmentRepo->findByInstitutionUnitId(
            $institutionUnit->getId()
        );

        $this->schemaOrgGenerator->addSchemaForUnit($institutionUnit);

        return $this->render('institution_unit/unit_page.html.twig', [
            'institutionUnit' => $institutionUnit,
            'image' => $this->getImage($institutionUnit),
            'unitDepartments' => $unitDepartments,
            'numComments' => $this->commentRepo->countCommentsByParams(
                entity: $institutionUnit,
                types: [
                    CommentType::GRATITUDE,
                    CommentType::COMPLAINT,
                    CommentType::REVIEW,
                ],
            ),
        ]);
    }

    private function initBreadcrumb(InstitutionUnit $unit)
    {
        $this->breadcrumbBuilder->addTerritorialUnitBreadcrumb($unit->getCityDistrict() ?? $unit->getCity(), true);

        $institution = $unit->getInstitution();

        if ($institution->isHasSeveralUnits()) {
            $this->breadcrumbBuilder->addInstitutionBreadcrumbItem($institution);
        }

        $this->breadcrumbBuilder->addBreadcrumbItem($unit->getName().' ');
    }

    private function initSeo(InstitutionUnit $unit)
    {
        $name = $unit->getName();

        $params = [
            '%name%' => $name,
            '%city%' => $this->tuNameFormatter->getName($unit->getCity()),
        ];

        $this->seoGenerator
            ->setTitle($this->translator->trans('institution_unit.title', $params, 'seo'))
            ->setDescription($this->translator->trans('institution_unit.description', $params, 'seo'))
            ->setKeywords($this->translator->trans('institution_unit.keywords', $params, 'seo'))
        ;
    }

    private function getImage(InstitutionUnit $unit): ?string
    {
        $images = $this->mediaService->getGalleryMedia($unit);

        $image = current($images);

        if (!$image) {
            return null;
        }

        return $this->mediaService->getUrl($image);
    }
}

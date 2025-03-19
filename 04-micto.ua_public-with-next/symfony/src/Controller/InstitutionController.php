<?php

namespace App\Controller;

use App\Entity\CommentType;
use App\Entity\Institution\Institution;
use App\Menu\BreadcrumbBuilder;
use App\Repository\CommentRepository;
use App\Repository\Institution\InstitutionRepository;
use App\Repository\Institution\InstitutionUnitRepository;
use App\Repository\Institution\InstitutionUnitTypeRepository;
use App\Seo\SeoGenerator;
use App\Service\Institution\InstitutionUnitUrlGenerator;
use App\Service\Institution\InstitutionUrlGenerator;
use App\Service\Media\MediaService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Attribute\Route;

class InstitutionController extends AbstractController
{
    public function __construct(
        private readonly InstitutionUnitTypeRepository $unitTypeRepo,
        private readonly InstitutionRepository $institutionRepo,
        private readonly InstitutionUnitRepository $institutionUnitRepo,
        private readonly CommentRepository $commentRepo,
        private readonly BreadcrumbBuilder $breadcrumbBuilder,
        private readonly SeoGenerator $seoGenerator,
        private readonly InstitutionUnitUrlGenerator $unitUrlGenerator,
        private readonly InstitutionUrlGenerator $institutionUrlGenerator,
        private readonly MediaService $mediaService,
    ) {}

    #[Route('/{slug}/institution-{id}/', 'institution_page')]
    public function institutionPage(int $id, string $slug): Response
    {
        if (!$institution = $this->institutionRepo->getOneById($id)) {
            throw new NotFoundHttpException('Institution not found');
        }

        // Redirect to unit page if institution has only one unit
        if (
            !$institution->isHasSeveralUnits()
            && $unit = $institution->getUnits()->first()
        ) {
            return $this->redirect($this->unitUrlGenerator->getUrl($unit));
        }

        if ($slug != $institution->getSlug()) {
            return $this->redirect($this->institutionUrlGenerator->getUrl($institution));
        }

        $this->breadcrumbBuilder->addBreadcrumbItem($institution->getName());

        $this->seoGenerator
            ->setTitle(sprintf('%s ▪ МІСТО.юа', $institution->getName()))
            ->setDescription(sprintf('Інформація про медичний заклад %s', $institution->getName()))
            ->setKeywords($institution->getName())
        ;

        $institutionUnits = $this->institutionUnitRepo->findByInstitutionId($id);

        return $this->render('institution/institution_page.html.twig', [
            'numComments' => $this->commentRepo->countCommentsByParams(
                entity: $institution,
                types: [
                    CommentType::GRATITUDE,
                    CommentType::COMPLAINT,
                    CommentType::REVIEW,
                ],
            ),
            'institution' => $institution,
            'image' => $this->getImage($institution),
            'institutionUnits' => $institutionUnits,
        ]);
    }

    public function getCityInstitutionTypes(int $cityId, int $cityDistrictId = null): Response
    {
        $institutionTypes = $this->unitTypeRepo->findByCityId($cityId, $cityDistrictId);

        return $this->render('institution/types_block.html.twig', [
            'cityId' => $cityId,
            'cityDistrictId' => $cityDistrictId,
            'institutionTypes' => $institutionTypes,
        ]);
    }

    private function getImage(Institution $institution): ?string
    {
        $images = $this->mediaService->getGalleryMedia($institution);

        $image = current($images);

        if (!$image) {
            return null;
        }

        return $this->mediaService->getUrl($image);
    }
}

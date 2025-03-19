<?php

namespace App\Controller;

use App\Repository\AreaRepository;
use App\Repository\CityDistrictRepository;
use App\Repository\CityRepository;
use App\Repository\DistrictRepository;
use App\Repository\TerritorialUnitRepositoryInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;

class TerritorialUnitController extends AbstractController
{
    public function __construct(
        private readonly AreaRepository $areaRepo,
        private readonly DistrictRepository $districtRepo,
        private readonly CityRepository $cityRepo,
        private readonly CityDistrictRepository $cityDistrictRepo,
    ){}

    #[Route(
        '/{slug}-r{id}/',
        name: 'tu_page',
        requirements: [
            'id' => '\d+',
            'slug' => '[\w\d\-_]+',
        ]
    )]
    public function tuPage(int $id, string $slug): Response
    {
        return $this->forwardTo($id, $slug, $this->areaRepo, sprintf('%s::areaPage', AreaController::class))
            ?? $this->forwardTo($id, $slug, $this->districtRepo, sprintf('%s::districtPage', DistrictController::class))
            ?? $this->forwardTo($id, $slug, $this->cityRepo, sprintf('%s::cityPage', CityController::class))
            ?? $this->forwardTo($id, $slug, $this->cityDistrictRepo, sprintf('%s::cityDistrictPage', CityController::class))
            ?? throw new NotFoundHttpException('Not found')
        ;
    }

    private function forwardTo(
        int $id,
        string $slug,
        TerritorialUnitRepositoryInterface $repo,
        string $controller
    ): ?Response
    {
        if (!$unit = $repo->getOneByOldId($id)) {
            return null;
        }

        if ($slug != $unit->getSlug()) {
            return $this->redirectToRoute('tu_page', [
                'id' => $unit->getOldId(),
                'slug' => $unit->getSlug(),
            ], 301);
        }

        return $this->forward($controller, [
            'id'  => $unit->getId(),
        ]);
    }
}

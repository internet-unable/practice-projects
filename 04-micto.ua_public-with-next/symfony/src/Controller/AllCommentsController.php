<?php

namespace App\Controller;

use App\Components\ApiResponse;
use App\Entity\CityType;
use App\Entity\CommentType;
use App\Repository\AreaRepository;
use App\Repository\CityDistrictRepository;
use App\Repository\CityRepository;
use App\Repository\CommentRepository;
use App\Repository\DistrictRepository;
use App\Repository\Institution\InstitutionUnitRepository;
use Presta\SitemapBundle\Sitemap\Url\UrlConcrete;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class AllCommentsController extends AbstractController
{
    const NUM_ON_PAGE = 10;

    private const REVIEW_TYPES = [
        CommentType::GRATITUDE,
        CommentType::COMPLAINT,
        CommentType::REVIEW,
    ];

    private const DEFAULT_ORDER_BY = '-date';

    private const ORDER_BY_LIST = [
        '-rating' => 'По оцінці: від вищої',
        'rating' => 'По оцінці: від нижчої',
        '-date' => 'По даті: новіші',
        'date' => 'По даті: старіші',
    ];

    public function __construct(
        private readonly CommentRepository $commentRepo,
        private readonly AreaRepository $areaRepo,
        private readonly DistrictRepository $districtRepo,
        private readonly CityRepository $cityRepo,
        private readonly CityDistrictRepository $cityDistrictRepo,
        private readonly InstitutionUnitRepository $unitRepo,
    ){}

    #[Route('/allcomments/', 'all_comments_page', options: ['sitemap' => [
        'priority' => 0.4,
        'changefreq' => UrlConcrete::CHANGEFREQ_DAILY
    ]])]
    public function allCommentsPage(Request $request): Response
    {
        $filter = $request->get('filter', []);
        $page = $request->get('page', 1);
        $page = $page > 0 ? $page : 1;
        $offset = self::NUM_ON_PAGE * ($page-1);
        $orderBy = $this->getOrderBy($request);

        $numComments = $this->commentRepo->countCommentsByParams(
            types: self::REVIEW_TYPES,
            filter: $this->prepareSelectedFilters($filter),
        );

        $numPages = ceil($numComments/self::NUM_ON_PAGE);

        $comments = [];

        if ($page <= $numPages) {
            $comments = $this->commentRepo->getCommentsByParams(
                types: self::REVIEW_TYPES,
                filter: $this->prepareSelectedFilters($filter),
                limit: self::NUM_ON_PAGE,
                offset: $offset,
                orderBy: $orderBy,
            );
        }

        return $this->render('comments/all_comments_page.html.twig', [
            'comments' => $comments,
            'nextPage' => $page+1 <= $numPages ? $page+1 : null,
            'orderByList' => self::ORDER_BY_LIST,
            'orderBy' => $orderBy,
            'selectedFilters' => $filter,
            'filters' => $this->getPageFilters($filter),
        ]);
    }

    #[Route('/api/all-comments/filters/', 'api_get_all_comments_filters')]
    public function getFilterBlock(Request $request): Response
    {
        $filter = $request->get('filter', []);

        return (new ApiResponse())
            ->setData([
                'html' => $this->renderView('comments/filters_list.html.twig', [
                    'selectedFilters' => $filter,
                    'filters' => $this->getPageFilters($filter),
                ]),
            ]);
    }

    #[Route('/api/all-comments/', 'api_get_all_comments_page')]
    public function getCommentsPage(Request $request): Response
    {
        $filter = $request->get('filter', []);
        $page = $request->get('page', 1);
        $page = $page > 0 ? $page : 1;
        $offset = self::NUM_ON_PAGE * ($page-1);
        $orderBy = $this->getOrderBy($request);

        $numComments = $this->commentRepo->countCommentsByParams(
            types: self::REVIEW_TYPES,
            filter: $this->prepareSelectedFilters($filter),
        );

        $numPages = ceil($numComments/self::NUM_ON_PAGE);

        $comments = [];

        if ($page <= $numPages) {
            $comments = $this->commentRepo->getCommentsByParams(
                types: self::REVIEW_TYPES,
                filter: $this->prepareSelectedFilters($filter),
                limit: self::NUM_ON_PAGE,
                offset: $offset,
                orderBy: $orderBy,
            );
        }

        $urlParams = [
            'filter' => $filter,
            'order' => self::DEFAULT_ORDER_BY != $orderBy ? $orderBy : null,
        ];

        return (new ApiResponse())
            ->setData([
                'url' => $this->generateUrl('all_comments_page', array_filter($urlParams)),
                'html' => $this->renderView('comments/comments_list.html.twig', [
                    'comments' => $comments,
                    'nextPage' => $page+1 <= $numPages ? $page+1 : null,
                    'selectedFilters' => $filter,
                    'orderBy' => $orderBy
                ]),
            ]);
    }

    private function prepareSelectedFilters(array $filters): array
    {
        foreach (['unit', 'city_district', 'city', 'district', 'area'] as $key) {
            if (!empty($filters[$key])) {
                if ($key == 'district' && preg_match('/^c\d+$/', $filters[$key])) {
                    return [
                        'city' => (int)str_replace('c', '', $filters[$key]),
                    ];
                }

                return [
                    $key => (int)$filters[$key],
                ];
            }
        }

        return [];
    }

    private function getPageFilters(array $selectedFilters): array
    {
        $filters = [
            'areas' => $this->areaRepo->findWithUnitsByParams(
                onlyWithComments: true,
            ),
        ];

        if (empty($selectedFilters['area'])) {
            return $filters;
        }

        $districts = $this->getDistrictFilters((int)$selectedFilters['area']);

        if (empty(array_filter($districts))) {
            return $filters;
        }

        $filters['districts'] = $districts;

        if (empty($selectedFilters['district'])) {
            return $filters;
        }

        if (preg_match('/^c\d+$/', $selectedFilters['district'])) {
            $filters['cityDistricts'] = $this->cityDistrictRepo->findWithUnitsByParams(
                cityId: (int)str_replace('c', '', $selectedFilters['district']),
                onlyWithComments: true,
            );
        } else {
            $filters['cities'] = $this->cityRepo->findWithUnitsByParams(
                districtId: (int)$selectedFilters['district'],
                onlyWithComments: true,
            );
        }

        if (!empty($selectedFilters['city_district'])) {
            $filters['units'] = $this->unitRepo->findAllByParams(
                cityDistrictIds: [(int)$selectedFilters['city_district']],
                onlyWithComments: true,
            );
        } elseif (!empty($selectedFilters['city'])) {
            $filters['units'] = $this->unitRepo->findAllByParams(
                cityIds: [(int)$selectedFilters['city']],
                onlyWithComments: true,
            );
        }

        return $filters;
    }

    private function getDistrictFilters(int $areaId): array
    {
        return [
            'cities' => $this->cityRepo->findWithUnitsByParams(
                areaId: $areaId,
                cityTypes: [
                    CityType::SPECIAL,
                ],
                onlyWithComments: true,
            ),
            'districts' => $this->districtRepo->findWithUnitsByParams(
                areaId: $areaId,
                onlyWithComments: true,
            ),
        ];
    }

    private function getOrderBy(Request $request): string
    {
        $orderBy = $request->get('order');

        if (isset(self::ORDER_BY_LIST[$orderBy])) {
            return $orderBy;
        }

        return self::DEFAULT_ORDER_BY;
    }
}

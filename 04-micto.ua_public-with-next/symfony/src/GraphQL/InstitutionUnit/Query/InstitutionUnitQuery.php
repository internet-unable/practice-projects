<?php

namespace App\GraphQL\InstitutionUnit\Query;

use App\Entity\Institution\InstitutionUnit;
use App\GraphQL\Common\Pagination\PaginationInput;
use App\GraphQL\InstitutionUnit\Input\InstitutionUnitFilterInput;
use App\GraphQL\InstitutionUnit\Type\InstitutionUnitList;
use App\Repository\Institution\InstitutionUnitRepository;
use SoftUa\UserBundle\Entity\User;
use TheCodingMachine\GraphQLite\Annotations\Cost;
use TheCodingMachine\GraphQLite\Annotations\InjectUser;
use TheCodingMachine\GraphQLite\Annotations\Query;

class InstitutionUnitQuery
{
    public function __construct(
        private readonly InstitutionUnitRepository $institutionUnitRepo,
    ){}

    #[Query(outputType: 'InstitutionUnit')]
    #[Cost(complexity: 10)]
    public function institutionUnit(int $id): ?InstitutionUnit
    {
        return $this->institutionUnitRepo->getOneByoldId($id);
    }

    #[Query]
    #[Cost(complexity: 50)]
    public function institutionUnits(
        ?InstitutionUnitFilterInput $filter = null,
        ?PaginationInput $pagination = null,
    ): InstitutionUnitList
    {
        $query = $this->institutionUnitRepo->allByParamsQuery(
            areaId: $filter?->areaId ?? null,
            unitTypeIds: $filter?->unitTypeIds ?? [],
            cityIds: $filter?->cityIds ?? [],
            districtIds: $filter?->districtIds ?? [],
            cityDistrictIds: $filter?->cityDistrictIds ?? [],
            onlyWithComments: $filter?->onlyWithComments ?? false,
            institutionId: $filter?->institutionId ?? null,
        );

        return new InstitutionUnitList($query, $pagination);
    }

    #[Query(outputType: '[InstitutionUnit!]')]
    public function myInstitutionUnits(
        #[InjectUser]
        User $user,
        ?int $institutionId = null,
    ): array
    {
        return $this->institutionUnitRepo->getForUser($user->getId(), $institutionId);
    }
}

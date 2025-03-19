<?php

namespace App\GraphQL\UnitDepartment\Query;

use App\Entity\Institution\InstitutionUnitDepartment;
use App\GraphQL\Common\Pagination\PaginationInput;
use App\GraphQL\UnitDepartment\Type\UnitDepartmentListType;
use App\Repository\Institution\InstitutionUnitDepartmentRepository;
use SoftUa\UserBundle\Entity\User;
use TheCodingMachine\GraphQLite\Annotations\InjectUser;
use TheCodingMachine\GraphQLite\Annotations\Logged;
use TheCodingMachine\GraphQLite\Annotations\Query;
use TheCodingMachine\GraphQLite\Annotations\Right;

class UnitDepartmentQuery
{
    public function __construct(
        private readonly InstitutionUnitDepartmentRepository $unitDepartmentRepo,
    ){}

    #[Query(outputType: 'UnitDepartment')]
    public function unitDepartment(
        ?int $id = null,
        ?int $oldId = null,
    ): ?InstitutionUnitDepartment
    {
        if (!$id && !$oldId) {
            return null;
        }

        if ($id) {
            return $this->unitDepartmentRepo->getOneById($id);
        }

        return $this->unitDepartmentRepo->getOneByOldId($oldId);
    }

    #[Query]
    public function unitDepartments(
        int $unitId,
        ?PaginationInput $pagination = null,
    ): UnitDepartmentListType
    {
        $query = $this->unitDepartmentRepo->getQueryByInstitutionUnitId($unitId);

        return new UnitDepartmentListType($query, $pagination);
    }

    #[Query(outputType: '[UnitDepartment!]')]
    public function myUnitDepartments(
        #[InjectUser]
        User $user,
        ?int $unitId = null,
    ): array
    {
        return $this->unitDepartmentRepo->getForUser($user->getId(), $unitId);
    }
}

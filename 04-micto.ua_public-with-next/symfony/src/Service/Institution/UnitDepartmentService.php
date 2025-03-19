<?php

namespace App\Service\Institution;

use App\Entity\Institution\InstitutionUnitDepartment;
use App\Repository\Institution\InstitutionUnitDepartmentRepository;
use RuntimeException;

class UnitDepartmentService
{
    public function __construct(
        private readonly InstitutionUnitDepartmentRepository $unitDepartmentRepo,
    ){}

    /**
     * @throws RuntimeException
     */
    public function save(InstitutionUnitDepartment $unitDepartment): void
    {
        $this->unitDepartmentRepo->save($unitDepartment);
    }
}

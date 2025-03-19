<?php

namespace App\Service\Institution;

use App\Entity\Institution\InstitutionUnit;
use App\Entity\Institution\InstitutionUnitDepartment;
use App\Repository\Institution\InstitutionUnitDepartmentRepository;
use App\Repository\Institution\InstitutionUnitRepository;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class UnitDepartmentUrlGenerator
{
    public function __construct(
        private readonly UrlGeneratorInterface $generator,
        private readonly InstitutionUnitDepartmentRepository $departmentRepo,
    ){}

    public function getUrl(InstitutionUnitDepartment $department, bool $isAbsolute = false): string
    {
        $referenceType = $isAbsolute ? UrlGeneratorInterface::ABSOLUTE_URL : UrlGeneratorInterface::ABSOLUTE_PATH;

        if (empty($department->getOldId())) {
            $department->setOldId($department->getId() + 80200);

            $this->departmentRepo->save($department);
        }

        $unit = $department->getUnit();

        return $this->url(
            $department->getOldId(),
            $department->getSlug(),
            $unit->getOldId(),
            $unit->getSlug(),
            $referenceType
        );
    }

    public function getUrlByArray(array $department, bool $isAbsolute = false): string
    {
        $referenceType = $isAbsolute ? UrlGeneratorInterface::ABSOLUTE_URL : UrlGeneratorInterface::ABSOLUTE_PATH;

        return $this->url(
            $department['oldId'],
            $department['slug'],
            $department['unit']['oldId'],
            $department['unit']['slug'],
            $referenceType
        );
    }

    private function url(
        int $id,
        string $slug,
        int $unitId,
        string $unitSlug,
        int $referenceType
    ): string
    {
        return $this->generator->generate(
            'unit_department_page',
            [
                'id' => $id,
                'slug' => $slug,
                'unitId' => $unitId,
                'unitSlug' => $unitSlug,
            ],
            $referenceType
        );
    }
}

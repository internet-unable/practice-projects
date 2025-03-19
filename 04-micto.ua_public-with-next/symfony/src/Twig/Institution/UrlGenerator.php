<?php

namespace App\Twig\Institution;

use App\Entity\Institution\Institution;
use App\Entity\Institution\InstitutionUnit;
use App\Entity\Institution\InstitutionUnitDepartment;
use App\Entity\Institution\InstitutionUnitType;
use App\Service\Institution\InstitutionUnitUrlGenerator;
use App\Service\Institution\InstitutionUrlGenerator;
use App\Service\Institution\UnitDepartmentUrlGenerator;
use App\Service\Institution\UnitTypeUrlGenerator;
use App\Service\Institution\UnitTypeUrlGeneratorService;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class UrlGenerator extends AbstractExtension
{
    public function __construct(
        private readonly UrlGeneratorInterface $generator,
        private readonly UnitTypeUrlGenerator $typeUrlGenerator,
        private readonly InstitutionUnitUrlGenerator $unitUrlGenerator,
        private readonly InstitutionUrlGenerator $institutionUrlGenerator,
        private readonly UnitDepartmentUrlGenerator $unitDepartmentUrlGenerator,
    ){}

    public function getFunctions(): array
    {
        return [
            new TwigFunction('institution_url', [$this, 'getUrl']),
            new TwigFunction('unit_type_url', [$this, 'getUnitTypeUrl']),
            new TwigFunction('unit_department_url', [$this, 'getUnitDepartmentUrl']),
            new TwigFunction('institution_unit_url', [$this, 'getUnitUrl']),
        ];
    }

    public function getUrl(Institution $institution, bool $relative = true): string
    {
        if (
            !$institution->isHasSeveralUnits()
            && $unit = $institution->getUnits()->first()
        ) {
            return $this->unitUrlGenerator->getUrl($unit, !$relative);
        }

        return $this->institutionUrlGenerator->getUrl($institution, !$relative);
    }

    public function getUnitTypeUrl(InstitutionUnitType $type, bool $relative = true): string
    {
        return $this->typeUrlGenerator->getUrl($type, !$relative);
    }

    public function getUnitUrl(InstitutionUnit $unit, bool $relative = true): string
    {
        return $this->unitUrlGenerator->getUrl($unit, !$relative);
    }

    public function getUnitDepartmentUrl(InstitutionUnitDepartment $department, bool $relative = true): string
    {
        return $this->unitDepartmentUrlGenerator->getUrl($department, !$relative);
    }
}

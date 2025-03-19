<?php

namespace App\Entity\Schedule;

use App\Entity\Institution\InstitutionUnitDepartment;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
class UnitDepartmentSchedule extends Schedule
{
    #[ORM\ManyToOne(inversedBy: 'schedule')]
    #[ORM\JoinColumn('entity_id', nullable: false)]
    private InstitutionUnitDepartment $unitDepartment;

    public function getUnitDepartment(): InstitutionUnitDepartment
    {
        return $this->unitDepartment;
    }

    public function setUnitDepartment(InstitutionUnitDepartment $unitDepartment): self
    {
        $this->unitDepartment = $unitDepartment;

        return $this;
    }
}

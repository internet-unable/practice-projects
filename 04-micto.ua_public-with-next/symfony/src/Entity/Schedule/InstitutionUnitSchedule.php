<?php

namespace App\Entity\Schedule;

use App\Entity\Institution\InstitutionUnit;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
class InstitutionUnitSchedule extends Schedule
{
    #[ORM\ManyToOne(inversedBy: 'schedule')]
    #[ORM\JoinColumn('entity_id', nullable: false)]
    private InstitutionUnit $institutionUnit;

    public function getInstitutionUnit(): InstitutionUnit
    {
        return $this->institutionUnit;
    }

    public function setInstitutionUnit(InstitutionUnit $institutionUnit): self
    {
        $this->institutionUnit = $institutionUnit;

        return $this;
    }
}

<?php

namespace App\Entity\UserEntity;

use App\Entity\Institution\Institution;
use App\Entity\Institution\InstitutionUnit;
use App\Entity\Institution\InstitutionUnitDepartment;
use App\Repository\UserPermissionRepository;
use Doctrine\ORM\Mapping as ORM;
use SoftUa\UserBundle\Entity\User;

#[ORM\Entity(repositoryClass: UserPermissionRepository::class)]
#[ORM\Table('user_entity_permissions')]
#[ORM\Index(columns: ['institution_id'], name: 'institution_idx')]
#[ORM\Index(columns: ['institution_unit_id'], name: 'institution_unit_idx')]
#[ORM\Index(columns: ['unit_department_id'], name: 'unit_department_idx')]
class UserEntityPermission
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn('user_id', nullable: false, onDelete: 'CASCADE')]
    private User $user;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn('institution_id', nullable: false, onDelete: 'CASCADE')]
    private Institution $institution;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn('institution_unit_id', nullable: true, onDelete: 'CASCADE')]
    private ?InstitutionUnit $institutionUnit = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn('unit_department_id', nullable: true, onDelete: 'CASCADE')]
    private ?InstitutionUnitDepartment $unitDepartment = null;

    public function __toString(): string
    {
        return $this->getId();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): User
    {
        return $this->user;
    }

    public function setUser(User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getInstitution(): Institution
    {
        return $this->institution;
    }

    public function setInstitution(Institution $institution): self
    {
        $this->institution = $institution;

        return $this;
    }

    public function getInstitutionUnit(): ?InstitutionUnit
    {
        return $this->institutionUnit;
    }

    public function setInstitutionUnit(?InstitutionUnit $institutionUnit): self
    {
        $this->institutionUnit = $institutionUnit;

        return $this;
    }

    public function getUnitDepartment(): ?InstitutionUnitDepartment
    {
        return $this->unitDepartment;
    }

    public function setUnitDepartment(?InstitutionUnitDepartment $unitDepartment): self
    {
        $this->unitDepartment = $unitDepartment;

        return $this;
    }

}

<?php

namespace SoftUa\UserBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use SoftUa\UserBundle\Repository\PermissionRepository;

#[ORM\Entity(repositoryClass: PermissionRepository::class)]
#[ORM\Table('role_permissions')]
#[ORM\UniqueConstraint('role_id_code',['role_id','code'])]
class RolePermission
{
    const PERMISSION_SUPER_ADMIN = 'SUPER_ADMIN';

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id;

    #[ORM\ManyToOne(targetEntity: Role::class, inversedBy: 'permissions')]
    #[ORM\JoinColumn(name:'role_id', referencedColumnName:'id', onDelete:'CASCADE')]
    private ?Role $role;

    #[ORM\Column(type: 'string', length: 255)]
    private ?string $code;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getRole(): ?Role
    {
        return $this->role;
    }

    public function setRole(?Role $role): void
    {
        $this->role = $role;
    }

    public function getCode(): ?string
    {
        return $this->code;
    }

    public function setCode(?string $code): void
    {
        $this->code = $code;
    }
}

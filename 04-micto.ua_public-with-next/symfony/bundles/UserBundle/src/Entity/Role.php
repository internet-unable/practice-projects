<?php

namespace SoftUa\UserBundle\Entity;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use SoftUa\UserBundle\Repository\RoleRepository;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

#[ORM\Entity(repositoryClass: RoleRepository::class)]
#[ORM\Table('roles')]
#[UniqueEntity('code')]
class Role
{
    const ROLE_USER = 'USER';
    const ROLE_SUPER_ADMIN = 'SUPER_ADMIN';
    const ROLE_ADMIN = 'ADMIN';

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    protected ?int $id;

    #[ORM\Column(type: 'string', length: 255, unique: true)]
    protected ?string $code;

    #[ORM\Column(type: 'string', length: 255)]
    protected ?string $description;

    #[ORM\OneToMany(
        mappedBy: 'role',
        targetEntity: RolePermission::class,
        cascade:['persist', 'remove'],
        orphanRemoval: true
    )]
    private Collection $permissions;

    #[ORM\ManyToMany(targetEntity: User::class, mappedBy: "rolesCollection")]
    private Collection $users;

    public function __construct()
    {
        $this->permissions = new ArrayCollection();
        $this->users = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCode(): ?string
    {
        return $this->code;
    }

    public function setCode(string $code): static
    {
        $this->code = strtoupper($code);

        return $this;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return Collection<int, RolePermission>
     */
    public function getPermissions(): Collection
    {
        return $this->permissions;
    }

    public function addPermission(RolePermission $permission): Role
    {
        if (!$this->permissions->contains($permission)) {
            $this->permissions->add($permission);
        }

        return $this;
    }

    public function removePermission(RolePermission $permission): Role
    {
        $this->permissions->removeElement($permission);

        return $this;
    }

    public function setPermissions(?Collection $permissions): Role
    {
        $this->permissions = $permissions;

        return $this;
    }

    public function getPermissionCodes(): array
    {
        $permissionCodes = [];

        foreach ($this->permissions as $permission) {
            $permissionCodes[] = $permission->getCode();
        }

        return $permissionCodes;
    }

    public function setPermissionCodes(array $permissionCodes): self
    {
        foreach ($this->permissions as $permission) {
            if (!in_array($permission->getCode(), $permissionCodes)) {
                $this->permissions->removeElement($permission);
            } else {
                // Remove codes which already exist in permissions list
                $permissionCodes = array_filter($permissionCodes, fn($v) => $v !== $permission->getCode());
            }
        }

        foreach ($permissionCodes as $code) {
            $permission = new RolePermission();
            $permission->setRole($this);
            $permission->setCode($code);
            $this->addPermission($permission);
        }

        return $this;
    }

    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function setUsers(Collection $users): void
    {
        $this->users = $users;
    }

    public function __toString(): string
    {
        return $this->code;
    }
}

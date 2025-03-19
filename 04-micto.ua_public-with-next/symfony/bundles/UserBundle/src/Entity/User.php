<?php

namespace SoftUa\UserBundle\Entity;

use DateTimeInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use SoftUa\UserBundle\Repository\UserRepository;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table('user')]
#[UniqueEntity('email')]
#[UniqueEntity('phone')]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 180, unique: true, nullable: false)]
    private string $email = '';

    #[ORM\Column(length: 15, unique: true, nullable: true)]
    private ?string $phone = null;

    #[ORM\Column(length: 100, nullable: true)]
    private ?string $firstName = null;

    #[ORM\Column(length: 100, nullable: true)]
    private ?string $lastName = null;

    #[ORM\Column(length: 100, nullable: true)]
    private ?string $middleName = null;

    #[ORM\Column(name: 'is_active', options: ['default'=>true])]
    private bool $isActive = true;

    #[ORM\Column(name: 'is_admin_user', options: ['default'=>false])]
    private bool $isAdminUser = false;

    #[ORM\Column(name: 'is_institution', options: ['default'=>false])]
    private bool $isInstitution = false;

    #[ORM\Column(name: 'date_of_birth', type: 'date', nullable: true)]
    private ?DateTimeInterface $dateOfBirth = null;

    #[ORM\ManyToMany(targetEntity: Role::class, inversedBy: "users")]
    #[ORM\JoinTable(name: "user_role")]
    #[ORM\JoinColumn(name: "user_id", referencedColumnName: "id", onDelete: "cascade")]
    private Collection $rolesCollection;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: UserDataConfirmation::class)]
    private Collection $confirmations;

    //#[Assert\NotBlank(message: 'Password should not be empty')]
    #[ORM\Column(length: 255, nullable: false)]
    private string $password = '';

    public function __construct()
    {
        $this->rolesCollection = new ArrayCollection();
        $this->confirmations = new ArrayCollection();
    }

    public function __toString(): string
    {
        return $this->getEmail();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(?string $phone): self
    {
        $this->phone = $phone;
        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = [];

        foreach ($this->rolesCollection->toArray() as $role) {
            $roles[] = 'ROLE_'.strtoupper($role->getCode());
        }

        $roles[] = 'ROLE_'.Role::ROLE_USER;

        if ($this->isAdminUser()) {
            $roles[] = 'ROLE_ADMIN';
        }

        return $roles;
    }

    public function getRolesCollection(): Collection
    {
        return $this->rolesCollection;
    }

    public function setRolesCollection(Collection $roles): self
    {
        $this->rolesCollection = $roles;

        return $this;
    }

    public function addRole(Role $role): self
    {
        $this->rolesCollection->add($role);

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(?string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(?string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getMiddleName(): ?string
    {
        return $this->middleName;
    }

    public function setMiddleName(?string $middleName): self
    {
        $this->middleName = $middleName;

        return $this;
    }

    public function getFullName(): string
    {
        return implode(' ', array_filter([
            $this->lastName,
            $this->firstName,
            $this->middleName,
        ]));
    }

    public function isActive(): bool
    {
        return $this->isActive;
    }

    public function setIsActive(bool $isActive): self
    {
        $this->isActive = $isActive;

        return $this;
    }

    public function isAdminUser(): bool
    {
        return $this->isAdminUser;
    }

    public function setIsAdminUser(bool $isAdminUser): self
    {
        $this->isAdminUser = $isAdminUser;

        return $this;
    }

    public function isInstitution(): bool
    {
        return $this->isInstitution;
    }

    public function setIsInstitution(bool $isInstitution): self
    {
        $this->isInstitution = $isInstitution;

        return $this;
    }

    public function getDateOfBirth(): ?DateTimeInterface
    {
        return $this->dateOfBirth;
    }

    public function setDateOfBirth(?DateTimeInterface $dateOfBirth): self
    {
        $this->dateOfBirth = $dateOfBirth;

        return $this;
    }

    /**
     * @return string[]
     */
    public function getPermissions(): array
    {
        $permissions = [];

        foreach ($this->rolesCollection as $role) {
            if ($role->getCode() == Role::ROLE_SUPER_ADMIN) {
                $permissions[] = RolePermission::PERMISSION_SUPER_ADMIN;
            }
            foreach ($role->getPermissions() as $permission) {
                $permissions[] = $permission->getCode();
            }
        }

        return $permissions;
    }

    public function hasPermission(string $permissionCode): bool
    {
        foreach ($this->getPermissions() as $permission) {
            if ($permission == RolePermission::PERMISSION_SUPER_ADMIN) {
                return true; // Super Admin has all permissions
            }

            if ($permission == $permissionCode) {
                return true;
            }
        }

        return false;
    }
}

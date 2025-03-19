<?php

namespace App\Entity\UserProfile;

use Doctrine\ORM\Mapping as ORM;
use SoftUa\UserBundle\Entity\User;

#[ORM\Entity]
#[ORM\Table('user_profile_doctor')]
class DoctorProfile implements UserProfileInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(nullable: true)]
    private ?string $position = null;

    #[ORM\Column(nullable: true)]
    private ?string $photo = null;

    #[ORM\OneToOne]
    #[ORM\JoinColumn('user_id', referencedColumnName: 'id', nullable: false, onDelete: 'CASCADE')]
    private User $user;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPosition(): ?string
    {
        return $this->position;
    }

    public function setPosition(?string $position): self
    {
        $this->position = $position;

        return $this;
    }

    public function getPhoto(): ?string
    {
        return $this->photo;
    }

    public function setPhoto(?string $photo): self
    {
        $this->photo = $photo;

        return $this;
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
}

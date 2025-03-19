<?php

namespace SoftUa\UserBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\Timestampable\Traits\TimestampableEntity;
use SoftUa\UserBundle\Repository\UserDataConfirmationRepository;

#[ORM\Entity(repositoryClass: UserDataConfirmationRepository::class)]
#[ORM\Table('user_data_confirmation')]
#[ORM\Index(columns: ['user_id'], name: 'user_idx')]
#[ORM\Index(columns: ['code'], name: 'code_idx')]
#[ORM\Index(columns: ['data_type'], name: 'data_type_idx')]
class UserDataConfirmation
{
    const DATA_TYPE_CHANGE_EMAIL = 'change_email';
    const DATA_TYPE_CHANGE_PASSWORD = 'change_password';

    use TimestampableEntity;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'confirmations')]
    #[ORM\JoinColumn('user_id', nullable: false, onDelete: 'CASCADE')]
    private User $user;

    #[ORM\Column(name: 'data_type', length: 255, nullable: false)]
    private string $dataType;

    #[ORM\Column(name: 'code', length: 255, nullable: false)]
    private string $code = "";

    #[ORM\Column(name: 'new_value', length: 255, nullable: true)]
    private ?string $newValue = null;

    #[ORM\Column(name: 'is_completed', options: ['default'=>false])]
    private bool $isCompleted = false;

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

    public function getDataType(): string
    {
        return $this->dataType;
    }

    public function setDataType(string $dataType): self
    {
        $this->dataType = $dataType;

        return $this;
    }

    public function getCode(): string
    {
        return $this->code;
    }

    public function setCode(string $code): self
    {
        $this->code = $code;

        return $this;
    }

    public function getNewValue(): ?string
    {
        return $this->newValue;
    }

    public function setNewValue(?string $newValue): self
    {
        $this->newValue = $newValue;

        return $this;
    }

    public function isCompleted(): bool
    {
        return $this->isCompleted;
    }

    public function setIsCompleted(bool $isCompleted): self
    {
        $this->isCompleted = $isCompleted;

        return $this;
    }
}

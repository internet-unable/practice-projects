<?php

namespace App\GraphQL\User\Type;

use SoftUa\UserBundle\Entity\UserDataConfirmation;
use SoftUa\UserBundle\Repository\UserDataConfirmationRepository;
use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\Type;

#[Type]
class ChangePasswordConfirmation
{
    protected readonly UserDataConfirmation $confirmation;

    public function __construct(
        private readonly UserDataConfirmationRepository $confirmationRepo
    ) {}

    public function setConfirmation(UserDataConfirmation $confirmation): void
    {
        $this->confirmation = $confirmation;
    }

    #[Field(name: 'isCompleted')]
    public function isCompleted(): bool
    {
        return $this->confirmation->isCompleted();
    }

    #[Field(name: 'isExpired')]
    public function isExpired(): bool
    {
        return $this->confirmationRepo->isChangePasswordConfirmationExpired($this->confirmation);
    }

    #[Field]
    public function getEmail(): string
    {
        return $this->confirmation->getUser()->getEmail();
    }
}

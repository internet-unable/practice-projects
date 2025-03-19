<?php

namespace App\GraphQL\User\Query;

use App\GraphQL\User\Type\ChangePasswordConfirmation;
use SoftUa\UserBundle\Repository\UserDataConfirmationRepository;
use TheCodingMachine\GraphQLite\Annotations\Cost;
use TheCodingMachine\GraphQLite\Annotations\Query;
use TheCodingMachine\GraphQLite\Exceptions\GraphQLException;

class ChangePasswordConfirmationQuery
{
    public function __construct(
        private readonly UserDataConfirmationRepository $confirmationRepo,
        private readonly ChangePasswordConfirmation $changePasswordConfirmation,
    ) {}

    #[Query]
    #[Cost(complexity: 10)]
    public function getChangePasswordConfirmation(string $code): ChangePasswordConfirmation
    {
        $confirmation = $this->confirmationRepo->getByPublicKey($code);

        if (!$confirmation) {
            throw new GraphQLException('Data not found', 404);
        }

        $this->changePasswordConfirmation->setConfirmation($confirmation);

        return $this->changePasswordConfirmation;
    }
}

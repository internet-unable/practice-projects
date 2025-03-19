<?php

namespace App\GraphQL\User\Query;

use App\Entity\MultiStepRegistration;
use App\Repository\MultiStepRegistrationRepository;
use TheCodingMachine\GraphQLite\Annotations\Cost;
use TheCodingMachine\GraphQLite\Annotations\Query;

class MultiStepRegistrationQuery
{
    public function __construct(
        private readonly MultiStepRegistrationRepository $registrationRepos,
    ) {}

    #[Query]
    #[Cost(complexity: 10)]
    public function getMultiStepRegistrationData(string $token): ?MultiStepRegistration
    {
        return $this->registrationRepos->getOneByToken($token);
    }
}

<?php

namespace App\GraphQL\Institution\Query;

use App\Entity\Institution\Institution;
use App\GraphQL\Common\Pagination\PaginationInput;
use App\GraphQL\Institution\Type\InstitutionList;
use App\Repository\Institution\InstitutionRepository;
use SoftUa\UserBundle\Entity\User;
use TheCodingMachine\GraphQLite\Annotations\Cost;
use TheCodingMachine\GraphQLite\Annotations\InjectUser;
use TheCodingMachine\GraphQLite\Annotations\Query;

class InstitutionQuery
{
    public function __construct(
        private readonly InstitutionRepository $institutionRepo,
    ){}

    #[Query]
    #[Cost(complexity: 10)]
    public function institution(int $id): ?Institution
    {
        return $this->institutionRepo->getOneById($id);
    }


//    #[Query]
//    #[Cost(complexity: 10)]
//    public function institutions(
//        ?PaginationInput $pagination,
//    ): InstitutionList
//    {
//        $query = $this->institutionRepo->getInstitutionsQuery();
//
//        return new InstitutionList($query, $pagination);
//    }

    #[Query(outputType: '[Institution!]')]
    public function myInstitutions(
        #[InjectUser]
        User $user,
    ): array
    {
        return $this->institutionRepo->getForUser($user->getId());
    }
}

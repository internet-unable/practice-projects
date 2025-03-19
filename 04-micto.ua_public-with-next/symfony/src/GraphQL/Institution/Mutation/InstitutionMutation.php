<?php

namespace App\GraphQL\Institution\Mutation;

use App\Entity\Institution\Institution;
use App\GraphQL\Common\Validator\InputValidator;
use App\GraphQL\Institution\Input\InstitutionInput;
use App\GraphQL\Institution\Transformer\InstitutionTransformer;
use App\Repository\Institution\InstitutionRepository;
use App\Service\Institution\InstitutionService;
use App\Service\Media\MediaService;
use App\Service\UserEntityAccessService;
use Exception;
use SoftUa\UserBundle\Entity\User;
use TheCodingMachine\GraphQLite\Annotations\InjectUser;
use TheCodingMachine\GraphQLite\Annotations\Mutation;
use TheCodingMachine\GraphQLite\Exceptions\GraphQLException;
use TheCodingMachine\GraphQLite\Middlewares\MissingAuthorizationException;

class InstitutionMutation
{
    public function __construct(
        private readonly InstitutionRepository $institutionRepo,
        private readonly InstitutionService $institutionService,
        private readonly InstitutionTransformer $institutionTransformer,
        private readonly InputValidator $validator,
        private readonly UserEntityAccessService $entityAccessService,
        private readonly MediaService $mediaService,
    ){}

    // todo: check possibility to add mutation and queries description
    #[Mutation]
    public function editInstitution(
        int $id,
        InstitutionInput $input,
        #[InjectUser]
        User $user,
    ): ?Institution
    {
        if (!$institution = $this->institutionRepo->getOneById($id)) {
            return null;
        }

        if (
            !$user->isActive()
            || !$this->entityAccessService->hasAccess($institution, $user->getId())
        ) {
            throw MissingAuthorizationException::forbidden();
        }

        $this->institutionTransformer->inputToInstitution($input, $institution);

        $this->validator->validate($institution, groups: ['update']);

        try {
            $this->institutionService->save($institution);
            $this->mediaService->saveGalleryMedia($institution, $input->image);
        } catch (Exception $e) {
            // todo: log instead of output
            throw new GraphQLException("Internal save error: ".$e->getMessage());
        }

        return $institution;
    }
}

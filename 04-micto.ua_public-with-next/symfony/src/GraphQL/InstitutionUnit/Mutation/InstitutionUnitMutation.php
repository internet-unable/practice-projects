<?php

namespace App\GraphQL\InstitutionUnit\Mutation;

use App\Entity\Institution\InstitutionUnit;
use App\GraphQL\Common\Validator\InputValidator;
use App\GraphQL\InstitutionUnit\Input\InstitutionUnitInput;
use App\GraphQL\InstitutionUnit\Transformer\InstitutionUnitTransformer;
use App\Repository\Institution\InstitutionRepository;
use App\Repository\Institution\InstitutionUnitRepository;
use App\Service\Institution\InstitutionException;
use App\Service\Institution\InstitutionUnitService;
use App\Service\Media\MediaService;
use App\Service\UserEntityAccessService;
use Exception;
use SoftUa\UserBundle\Entity\User;
use TheCodingMachine\GraphQLite\Annotations\InjectUser;
use TheCodingMachine\GraphQLite\Annotations\Mutation;
use TheCodingMachine\GraphQLite\Exceptions\GraphQLException;
use TheCodingMachine\GraphQLite\Middlewares\MissingAuthorizationException;

class InstitutionUnitMutation
{
    public function __construct(
        private readonly InstitutionUnitRepository $institutionUnitRepo,
        private readonly InstitutionRepository $institutionRepo,
        private readonly InstitutionUnitService $institutionUnitService,
        private readonly InstitutionUnitTransformer $institutionUnitTransformer,
        private readonly InputValidator $validator,
        private readonly UserEntityAccessService $entityAccessService,
        private readonly MediaService $mediaService,
    ){}

    /**
     * @throws GraphQLException|MissingAuthorizationException
     */
    #[Mutation]
    public function editInstitutionUnit(
        int $id,
        InstitutionUnitInput $input,
        #[InjectUser]
        User $user,
    ): ?InstitutionUnit
    {
        if (!$institutionUnit = $this->institutionUnitRepo->getOneById($id)) {
            return null;
        }

        if (
            !$user->isActive()
            || !$this->entityAccessService->hasAccess($institutionUnit, $user->getId())
        ) {
            throw MissingAuthorizationException::forbidden();
        }

        $this->validator->validate($input);

        $institutionUnit = $this->institutionUnitTransformer->inputToInstitutionUnit($input, $institutionUnit);

        try {
            $this->institutionUnitService->save($institutionUnit);

            $this->mediaService->saveGalleryMedia($institutionUnit, $input->image);
        } catch (InstitutionException $e) {
            throw new GraphQLException("Save error: ".$e->getMessage());
        } catch (Exception $e) {
            // todo: log instead of output
            throw new GraphQLException("Internal save error: ".$e->getMessage());
        }

        return $institutionUnit;
    }

    /**
     * @throws GraphQLException|MissingAuthorizationException
     */
    #[Mutation]
    public function createInstitutionUnit(
        int $institutionId,
        InstitutionUnitInput $input,
        #[InjectUser]
        User $user,
    ): ?InstitutionUnit
    {
        if (!$institution = $this->institutionRepo->getOneById($institutionId)) {
            return null;
        }

        if (
            !$user->isActive()
            || !$this->entityAccessService->hasAccess($institution, $user->getId())
        ) {
            throw MissingAuthorizationException::forbidden();
        }

        $this->validator->validate($input, groups: ['create', 'Default']);

        $institutionUnit = $this->institutionUnitTransformer->inputToInstitutionUnit($input, null);
        $institutionUnit->setInstitution($institution);

        try {
            $this->institutionUnitService->save($institutionUnit);

            $this->mediaService->saveGalleryMedia($institutionUnit, $input->image);
        } catch (InstitutionException $e) {
            throw new GraphQLException("Save error: ".$e->getMessage());
        } catch (Exception $e) {
            // todo: log instead of output
            throw new GraphQLException("Internal save error: ".$e->getMessage());
        }

        return $institutionUnit;
    }
}

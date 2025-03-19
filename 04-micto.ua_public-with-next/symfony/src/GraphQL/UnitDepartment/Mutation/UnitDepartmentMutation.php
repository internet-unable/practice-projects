<?php

namespace App\GraphQL\UnitDepartment\Mutation;

use App\Entity\Institution\InstitutionUnitDepartment;
use App\GraphQL\Common\Validator\InputValidator;
use App\GraphQL\UnitDepartment\Input\UnitDepartmentInput;
use App\GraphQL\UnitDepartment\Transformer\UnitDepartmentTransformer;
use App\Repository\Institution\InstitutionUnitDepartmentRepository;
use App\Repository\Institution\InstitutionUnitRepository;
use App\Service\Institution\InstitutionException;
use App\Service\Institution\UnitDepartmentService;
use App\Service\Media\MediaService;
use App\Service\UserEntityAccessService;
use SoftUa\UserBundle\Entity\User;
use TheCodingMachine\GraphQLite\Annotations\InjectUser;
use TheCodingMachine\GraphQLite\Annotations\Mutation;
use TheCodingMachine\GraphQLite\Exceptions\GraphQLException;
use TheCodingMachine\GraphQLite\Middlewares\MissingAuthorizationException;

class UnitDepartmentMutation
{
    public function __construct(
        private readonly InputValidator $validator,
        private readonly InstitutionUnitDepartmentRepository $unitDepartmentRepo,
        private readonly InstitutionUnitRepository $institutionUnitRepo,
        private readonly UnitDepartmentTransformer $unitDepartmentTransformer,
        private readonly UnitDepartmentService $unitDepartmentService,
        private readonly UserEntityAccessService $entityAccessService,
        private readonly MediaService $mediaService,
    ){}

    /**
     * @throws GraphQLException|MissingAuthorizationException
     */
    #[Mutation]
    public function editUnitDepartment(
        int $id,
        UnitDepartmentInput $input,
        #[InjectUser]
        User $user
    ): ?InstitutionUnitDepartment
    {
        if (!$unitDepartment = $this->unitDepartmentRepo->getOneById($id)) {
            return null;
        }

        if (
            !$user->isActive()
            || !$this->entityAccessService->hasAccess($unitDepartment, $user->getId())
        ) {
            throw MissingAuthorizationException::forbidden();
        }

        $this->validator->validate($input);

        $unitDepartment = $this->unitDepartmentTransformer->inputToUnitDepartment($input, $unitDepartment);

        try {
            $this->unitDepartmentService->save($unitDepartment);

            $this->mediaService->saveGalleryMedia($unitDepartment, $input->image);
        } catch (InstitutionException $e) {
            throw new GraphQLException("Save error: ".$e->getMessage());
        } catch (\Exception $e) {
            // todo: log instead of output
            throw new GraphQLException("Internal save error: ".$e->getMessage());
        }

        return $unitDepartment;
    }

    /**
     * @throws GraphQLException|MissingAuthorizationException
     */
    #[Mutation]
    public function createUnitDepartment(
        int $institutionUnitId,
        UnitDepartmentInput $input,
        #[InjectUser]
        User $user,
    ): ?InstitutionUnitDepartment
    {
        if (!$unit = $this->institutionUnitRepo->getOneById($institutionUnitId)) {
            return null;
        }

        if (
            !$user->isActive()
            || !$this->entityAccessService->hasAccess($unit, $user->getId())
        ) {
            throw MissingAuthorizationException::forbidden();
        }

        $this->validator->validate($input, groups: ['create', 'Default']);

        $unitDepartment = $this->unitDepartmentTransformer->inputToUnitDepartment($input, null);
        $unitDepartment->setUnit($unit);

        try {
            $this->unitDepartmentRepo->save($unitDepartment);

            $this->mediaService->saveGalleryMedia($unitDepartment, $input->image);
        } catch (InstitutionException $e) {
            throw new GraphQLException("Save error: ".$e->getMessage());
        } catch (Exception $e) {
            // todo: log instead of output
            throw new GraphQLException("Internal save error: ".$e->getMessage());
        }

        return $unitDepartment;
    }
}

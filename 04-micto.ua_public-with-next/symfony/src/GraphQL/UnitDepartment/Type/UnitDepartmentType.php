<?php

namespace App\GraphQL\UnitDepartment\Type;

use App\Entity\Institution\InstitutionUnitDepartment;
use App\GraphQL\Contacts\Transformer\ContactsTransformer;
use App\GraphQL\Contacts\Type\ContactsType;
use App\Service\Media\MediaService;
use App\Service\UserEntityAccessService;
use SoftUa\UserBundle\Entity\User;
use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\InjectUser;
use TheCodingMachine\GraphQLite\Annotations\Right;
use TheCodingMachine\GraphQLite\Annotations\SourceField;
use TheCodingMachine\GraphQLite\Annotations\Type;

#[Type(class: InstitutionUnitDepartment::class, name: 'UnitDepartment')]
#[SourceField(name: 'id')]
#[SourceField(name: 'name')]
#[SourceField(name: 'fullName')]
#[SourceField(name: 'slug')]
#[SourceField(name: 'number')]
#[SourceField(name: 'description')]
#[SourceField(name: 'oldId')]
#[SourceField(name: 'rating')]
#[SourceField(name: 'isPublished', annotations: [new Right('ROLE_ADMIN')])]

#[SourceField(name: 'unit')]
#[SourceField(name: 'schedule', outputType: '[Schedule!]')]
class UnitDepartmentType
{
    public function __construct(
        private readonly ContactsTransformer $contactsTransformer,
        private readonly UserEntityAccessService $entityAccessService,
        private readonly MediaService $mediaService,
    ){}

    #[Field]
    public function getContacts(InstitutionUnitDepartment $unitDepartment): ?ContactsType
    {
        return $this->contactsTransformer->arrayToType(
            $unitDepartment->getContacts(),
        );
    }

    #[Field(outputType: 'Boolean!', description: 'Is user can edit current institution')]
    public function canEdit(
        InstitutionUnitDepartment $unitDepartment,
        #[InjectUser]
        ?User $user
    ): bool
    {
        if (!$user) {
            return false;
        }

        return $this->entityAccessService->hasAccess($unitDepartment, $user->getId());
    }

    #[Field(name: 'images', outputType: '[Media]', description: 'Institution unit department images')]
    public function getImages(InstitutionUnitDepartment $unitDepartment): array
    {
        return $this->mediaService->getGalleryMedia($unitDepartment);
    }
}

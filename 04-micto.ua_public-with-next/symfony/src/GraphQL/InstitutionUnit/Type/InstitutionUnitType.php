<?php

namespace App\GraphQL\InstitutionUnit\Type;

use App\Entity\Institution\InstitutionUnit;
use App\GraphQL\Address\Transformer\AddressTransformer;
use App\GraphQL\Address\Type\AddressType;
use App\GraphQL\Common\Pagination\PaginationInput;
use App\GraphQL\Contacts\Transformer\ContactsTransformer;
use App\GraphQL\Contacts\Type\ContactsType;
use App\GraphQL\UnitDepartment\Type\UnitDepartmentListType;
use App\Repository\Institution\InstitutionUnitDepartmentRepository;
use App\Service\Media\MediaService;
use App\Service\UserEntityAccessService;
use SoftUa\UserBundle\Entity\User;
use Symfony\Contracts\Translation\TranslatorInterface;
use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\InjectUser;
use TheCodingMachine\GraphQLite\Annotations\Right;
use TheCodingMachine\GraphQLite\Annotations\SourceField;
use TheCodingMachine\GraphQLite\Annotations\Type;

#[Type(class: InstitutionUnit::class, name: 'InstitutionUnit')]
#[SourceField(name: 'id')]
#[SourceField(name: 'name')]
#[SourceField(name: 'fullName')]
#[SourceField(name: 'slug')]
#[SourceField(name: 'description')]
#[SourceField(name: 'edrpou')]
#[SourceField(name: 'oldId')]
#[SourceField(name: 'rating')]
#[SourceField(name: 'isPublished', annotations: [new Right('ROLE_ADMIN')])]

#[SourceField(name: 'institution')]
#[SourceField(name: 'type')]
#[SourceField(name: 'city')]
#[SourceField(name: 'cityDistrict')]
#[SourceField(name: 'comments', outputType: '[Comment!]')]
#[SourceField(name: 'schedule', outputType: '[Schedule!]')]
class InstitutionUnitType
{
    public function __construct(
        private readonly InstitutionUnitDepartmentRepository $unitDepartmentRepo,
        private readonly TranslatorInterface $translator,
        private readonly ContactsTransformer $contactsTransformer,
        private readonly UserEntityAccessService $entityAccessService,
        private readonly AddressTransformer $addressTransformer,
        private readonly MediaService $mediaService,
    ){}

    #[Field]
    public function getDepartments(
        InstitutionUnit $institutionUnit,
        ?PaginationInput $pagination,
    ): UnitDepartmentListType
    {
        $unitDepartmentsQuery = $this->unitDepartmentRepo->getQueryByInstitutionUnitId($institutionUnit->getId());

        return new UnitDepartmentListType($unitDepartmentsQuery, $pagination);
    }

    #[Field(outputType: 'LegalForm', description: 'Організаційно-правова форма')]
    public function getLegalForm(InstitutionUnit $institutionUnit): ?LegalFormType
    {
        if (!$institutionUnit->getLegalForm()) {
            return null;
        }

        $form =  new LegalFormType();
        $form->name = $institutionUnit->getLegalForm()->name;
        $form->title = $institutionUnit->getLegalForm()->trans($this->translator);

        return $form;
    }

    #[Field]
    public function getContacts(InstitutionUnit $institutionUnit): ?ContactsType
    {
        return $this->contactsTransformer->arrayToType(
            $institutionUnit->getContacts(),
        );
    }

    #[Field(outputType: 'Address', description: 'Institution unit address')]
    public function getAddress(InstitutionUnit $institutionUnit): ?AddressType
    {
        if (!$address = $institutionUnit->getAddress()) {
            return null;
        }

        return $this->addressTransformer->addressToType($address);
    }

    #[Field(outputType: 'Boolean!', description: 'Is user can edit current institution')]
    public function canEdit(
        InstitutionUnit $institutionUnit,
        #[InjectUser]
        ?User $user
    ): bool
    {
        if (!$user) {
            return false;
        }

        return $this->entityAccessService->hasAccess($institutionUnit, $user->getId());
    }

    #[Field(name: 'images', outputType: '[Media]', description: 'Institution unit images')]
    public function getImages(InstitutionUnit $institutionUnit): array
    {
        return $this->mediaService->getGalleryMedia($institutionUnit);
    }
}

<?php

namespace App\GraphQL\Institution\Type;

use App\Entity\Institution\Institution;
use App\Service\Media\MediaService;
use App\Service\UserEntityAccessService;
use SoftUa\UserBundle\Entity\User;
use Symfony\Contracts\Translation\TranslatorInterface;
use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\InjectUser;
use TheCodingMachine\GraphQLite\Annotations\SourceField;
use TheCodingMachine\GraphQLite\Annotations\Type;

#[Type(class: Institution::class, name: 'Institution')]
#[SourceField(name: 'id')]
#[SourceField(name: 'name')]
#[SourceField(name: 'fullName')]
#[SourceField(name: 'slug')]
#[SourceField(name: 'description')]
#[SourceField(name: 'isPublished')]
#[SourceField(name: 'hasSeveralUnits')]
#[SourceField(name: 'rating')]
class InstitutionType
{
    public function __construct(
        private readonly TranslatorInterface $translator,
        private readonly UserEntityAccessService $entityAccessService,
        private readonly MediaService $mediaService,
    ){}

    #[Field(description: 'Ownership form')]
    public function getOwnershipForm(Institution $institution): OwnershipFormType
    {
        $form =  new OwnershipFormType();
        $form->name = $institution->getOwnershipForm()->name;
        $form->title = $institution->getOwnershipForm()->trans($this->translator);

        return $form;
    }

    #[Field(outputType: 'Boolean!', description: 'Is user can edit current institution')]
    public function canEdit(
        Institution $institution,
        #[InjectUser]
        ?User $user
    ): bool
    {
        if (!$user) {
            return false;
        }

        return $this->entityAccessService->hasAccess($institution, $user->getId());
    }

    #[Field(name: 'images', outputType: '[Media]', description: 'Institution images')]
    public function getImages(Institution $institution): array
    {
        return $this->mediaService->getGalleryMedia($institution);
    }
}

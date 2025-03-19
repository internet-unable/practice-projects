<?php

namespace App\GraphQL\User\Type;

use App\GraphQL\Contacts\Transformer\ContactsTransformer;
use App\GraphQL\Contacts\Type\PhoneType;
use App\Repository\DoctorProfileRepository;
use SoftUa\UserBundle\Entity\User;
use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\SourceField;
use TheCodingMachine\GraphQLite\Annotations\Type;

#[Type(class: User::class, name: 'User')]
#[SourceField(name: 'email')]
#[SourceField(name: 'firstName')]
#[SourceField(name: 'lastName')]
#[SourceField(name: 'middleName')]
#[SourceField(name: 'isActive')]
#[SourceField(name: 'isAdminUser')]
class UserType
{
    public function __construct(
        private readonly DoctorProfileRepository $doctorProfileRepo,
        private readonly ContactsTransformer $contactsTransformer,
    ){}

    #[Field]
    public function getDoctorProfile(User $user): ?DoctorProfileType
    {
        $doctorProfile = $this->doctorProfileRepo->getByUserId($user->getId());

        if (!$doctorProfile) {
            return null;
        }

        return (new DoctorProfileType())
            ->setPosition($doctorProfile->getPosition())
            ->setPhoto($doctorProfile->getPhoto());
    }

    #[Field]
    public function getPhone(User $user): ?PhoneType
    {
        if (!$user->getPhone()) {
            return null;
        }

        return (new PhoneType())->setNumber(
            $user->getPhone()
        );
    }

    #[Field]
    public function getIsInstitution(User $user): bool
    {
        return $user->isInstitution();
    }
}

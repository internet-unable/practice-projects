<?php

namespace App\GraphQL\Institution\Input;

use App\Common\Arrayable;
use App\Entity\Institution\OwnershipForm;
use App\GraphQL\Institution\Type\CreateInstitutionRequestStatusType;
use App\GraphQL\Institution\Type\CreateInstitutionRequestUserType;
use App\Validator\Constraints\RecaptchaTrue;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Context\ExecutionContextInterface;
use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\Input;

#[Input(description: 'Input for request to create institution')]
class CreateInstitutionRequestInput implements Arrayable
{
    #[Field(description: 'User type')]
    public CreateInstitutionRequestUserType $userType;

    #[Field(description: 'User contacts')]
    public ?string $contacts = null;

    #[Field]
    public ?bool $agreeTerms = null;

    #[Assert\NotBlank(normalizer: 'trim')]
    #[Assert\Length(
        min: 2,
        max: 255,
        minMessage: 'Значення занадто коротке. Введіть більше {{ limit }} символів',
        maxMessage: 'Значення занадто довге. Введіть менше {{ limit }} символів',
    )]
    #[Field(description: "Institution full name")]
    public string $fullName;

    #[Field(description: "Institution short name")]
    public ?string $shortName = null;

    #[Field(description: "Institution type")]
    public string $institutionType;

    #[Field(description: "Institution ownership form type")]
    public OwnershipForm $ownershipForm;

    #[Field(description: "Institution address")]
    public string $address;

    #[Field(description: "Institution chief name")]
    public ?string $chiefFullName = null;

    #[Field(description: "Institution head doctor name")]
    public ?string $headDoctorFullName = null;

    #[Field(description: "Institution phones")]
    public string $phones;

    #[Assert\Email(mode: Assert\Email::VALIDATION_MODE_STRICT)]
    #[Field(description: "Institution email")]
    public ?string $email = null;

    #[Field(description: "Institution schedule")]
    public ?string $schedule = null;

    #[Field(description: "Institution edrpou")]
    public ?string $edrpou = null;

    #[Field(description: "Institution status")]
    public ?CreateInstitutionRequestStatusType $institutionStatus = null;

    #[RecaptchaTrue]
    #[Field(description: "Recaptcha code")]
    public string $recaptcha;

    #[Assert\Callback]
    public function validate(ExecutionContextInterface $context): void
    {
        if (CreateInstitutionRequestUserType::INSTITUTION != $this->userType) {
            return;
        }

        if (empty($this->contacts)) {
            $context->buildViolation('Вкажіть, будь ласка, контактну пошту, ім\'я та посаду.')
                ->atPath('contacts')
                ->addViolation();
        }

        if (!$this->agreeTerms) {
            $context->buildViolation('Необхідно надати дозвіл на обробку персональної інформації.')
                ->atPath('agreeTerms')
                ->addViolation();
        }
    }

    public function toArray(): array
    {
        return [
            'userType' => $this->userType->value,
            'contacts' => $this->contacts,
            'agreeTerms' => $this->agreeTerms,
            'fullName' => $this->fullName,
            'shortName' => $this->shortName,
            'institutionType' => $this->institutionType,
            'ownershipForm' => $this->ownershipForm,
            'address' => $this->address,
            'chiefFullName' => $this->chiefFullName,
            'headDoctorFullName' => $this->headDoctorFullName,
            'phones' => $this->phones,
            'email' => $this->email,
            'schedule' => $this->schedule,
            'edrpou' => $this->edrpou,
            'institutionStatus' => $this->institutionStatus?->value,
        ];
    }
}

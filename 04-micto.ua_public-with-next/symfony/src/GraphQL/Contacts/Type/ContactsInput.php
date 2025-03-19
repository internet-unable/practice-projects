<?php

namespace App\GraphQL\Contacts\Type;

use App\Common\Arrayable;
use Symfony\Component\Validator\Constraints as Assert;
use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\Input;

#[Input]
class ContactsInput implements Arrayable
{
    // todo: add validator
    /** @var array<EmailInput>  */
    #[Assert\Valid]
    #[Field(inputType: '[EmailInput!]')]
    public array $emails = [];

    // todo: add validator
    /** @var array<PhoneInput>  */
    #[Assert\Valid]
    #[Field(inputType: '[PhoneInput!]')]
    public array $phones = [];

    public function toArray(): array
    {
        $result = [];

        foreach ($this->emails as $email) {
            $result['emails'][] = $email->toArray();
        }

        foreach ($this->phones as $phone) {
            $result['phones'][] = $phone->toArray();
        }

        return $result;
    }
}

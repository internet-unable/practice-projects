<?php

namespace App\GraphQL\Contacts\Type;

use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\Type;

#[Type(name: 'Contacts')]
class ContactsType
{
    /** @var array<EmailType> */
    #[Field(outputType: '[Email!]')]
    public array $emails = [];

    /** @var array<PhoneType> */
    #[Field(outputType: '[Phone!]')]
    public array $phones = [];
}

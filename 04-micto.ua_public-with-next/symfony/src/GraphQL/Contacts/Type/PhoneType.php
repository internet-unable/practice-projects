<?php

namespace App\GraphQL\Contacts\Type;

use App\Service\PhoneFormatter;
use TheCodingMachine\GraphQLite\Annotations\Autowire;
use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\Type;

#[Type(name: 'Phone')]
class PhoneType
{
    #[Field]
    private string $number;

    #[Field]
    private ?string $comment = null;

    public function getNumber(): string
    {
        return $this->number;
    }

    public function setNumber(string $number): self
    {
        $this->number = $number;

        return $this;
    }

    #[Field]
    public function getFormattedNumber(
        #[Autowire]
        PhoneFormatter $phoneFormatter
    ): string
    {
        return $phoneFormatter->getFormattedPhoneNumber($this->number) ?? $this->number;
    }

    public function getComment(): ?string
    {
        return $this->comment;
    }

    public function setComment(?string $comment): self
    {
        $this->comment = $comment;

        return $this;
    }
}

<?php

namespace App\GraphQL\Contacts\Type;

use App\Common\Arrayable;
use Misd\PhoneNumberBundle\Validator\Constraints\PhoneNumber as AssertPhoneNumber;
use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\Input;

#[Input]
class PhoneInput implements Arrayable
{
    #[Field]
    #[AssertPhoneNumber] // type: PhoneNumber::MOBILE
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

    public function getComment(): ?string
    {
        return $this->comment;
    }

    public function setComment(?string $comment): self
    {
        $this->comment = $comment;

        return $this;
    }

    public function toArray(): array
    {
        return [
            'number' => $this->number,
            'comment' => $this->comment,
        ];
    }
}

<?php

namespace App\GraphQL\Contacts\Type;

use App\Common\Arrayable;
use Symfony\Component\Validator\Constraints as Assert;
use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\Input;

#[Input]
class EmailInput implements Arrayable
{
    #[Field]
    #[Assert\Email]
    private string $email;

    #[Field]
    private ?string $comment = null;

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

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
            'email' => $this->email,
            'comment' => $this->comment,
        ];
    }
}

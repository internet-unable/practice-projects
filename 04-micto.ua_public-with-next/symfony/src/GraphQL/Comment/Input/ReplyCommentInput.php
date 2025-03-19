<?php

namespace App\GraphQL\Comment\Input;

use Misd\PhoneNumberBundle\Validator\Constraints\PhoneNumber;
use Symfony\Component\Validator\Constraints as Assert;
use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\Input;

#[Input(description: 'Input for comment reply')]
class ReplyCommentInput
{
    #[Field]
    #[Assert\NotBlank]
    public int $replyToId;

    #[Assert\NotBlank]
    #[Field(description: 'Reply text')]
    public string $text;
}

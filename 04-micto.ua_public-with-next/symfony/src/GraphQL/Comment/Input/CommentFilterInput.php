<?php

namespace App\GraphQL\Comment\Input;

use DateTimeInterface;
use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\Input;

#[Input(description: 'Input for filtering comments')]
class CommentFilterInput
{
    #[Field(inputType: '[TypeOfComment]')]
    public ?array $commentType = null;

    #[Field(description: "Select comments of nested units")]
    public bool $withChildrenUnits = true;

    #[Field]
    public ?DateTimeInterface $dateFrom = null;

    #[Field]
    public ?DateTimeInterface $dateTo = null;

    #[Field(inputType: '[Int]')]
    public ?array $unitDepartment = null;
}

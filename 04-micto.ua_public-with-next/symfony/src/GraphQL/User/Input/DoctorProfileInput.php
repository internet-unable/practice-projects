<?php

namespace App\GraphQL\User\Input;

use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\Input;

#[Input(description: 'Input type for the doctor profile')]
class DoctorProfileInput
{
    #[Field(description: "Doctor's position")]
    public ?string $position = null;

    #[Field(description: "Doctor's photo")]
    public ?string $photo = null;
}

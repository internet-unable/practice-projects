<?php

namespace App\GraphQL\Common\Pagination;

use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\Input;

#[Input]
class PaginationInput
{
    #[Field]
    public ?int $page = 1;

    #[Field]
    public ?int $limit = 10;
}

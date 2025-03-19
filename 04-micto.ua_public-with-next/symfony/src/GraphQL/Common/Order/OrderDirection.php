<?php

namespace App\GraphQL\Common\Order;

enum OrderDirection: string
{
    case ASC = 'ASC';
    case DESC = 'DESC';
}

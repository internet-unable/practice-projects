<?php

namespace App\GraphQL\Common\Order;

class OrderTransformer
{
    public function inputToArray($order): array
    {
        return [
            'field' => $order->field->value,
            'direction' => $order->direction->value,
        ];
    }
}

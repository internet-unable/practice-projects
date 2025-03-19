<?php

namespace App\GraphQL\Common\Helper;

use ReflectionClass;

class ObjectsCloneHelper
{
    public static function setScalarProperties(
        object $from,
        object $to,
        array $properties,
        bool $skipNull = true,
    ): void
    {
        $reflect = new ReflectionClass($from::class);

        foreach ($properties as $propName) {
            $property = $reflect->getProperty($propName);
            $value = $property->getValue($from);

            // todo: check getter

            if ($skipNull && $value === null) {
                continue;
            }

            if (!is_scalar($value)) {
                continue;
            }

            $method = 'set'.ucfirst($propName);
            if (method_exists($to, $method)) {
                $to->{$method}($value);
            }
        }
    }
}

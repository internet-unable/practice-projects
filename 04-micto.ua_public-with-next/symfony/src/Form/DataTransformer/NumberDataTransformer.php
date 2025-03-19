<?php
namespace App\Form\DataTransformer;

use Symfony\Component\Form\DataTransformerInterface;

class NumberDataTransformer implements DataTransformerInterface
{
    public function transform(mixed $value): mixed
    {
        return $value ?: '';
    }

    public function reverseTransform($value): mixed
    {
        return $value ?: null;
    }
}
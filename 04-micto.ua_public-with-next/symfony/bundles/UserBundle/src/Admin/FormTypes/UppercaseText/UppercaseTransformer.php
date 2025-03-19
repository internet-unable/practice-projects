<?php

namespace SoftUa\UserBundle\Admin\FormTypes\UppercaseText;

use Symfony\Component\Form\DataTransformerInterface;

class UppercaseTransformer implements DataTransformerInterface
{
    public function transform($value): string
    {
        return strtoupper($value);
    }

    public function reverseTransform($value): string
    {
        return strtoupper($value);
    }
}

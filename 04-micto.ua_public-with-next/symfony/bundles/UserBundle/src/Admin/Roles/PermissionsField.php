<?php

namespace SoftUa\UserBundle\Admin\Roles;

use EasyCorp\Bundle\EasyAdminBundle\Contracts\Field\FieldInterface;
use EasyCorp\Bundle\EasyAdminBundle\Field\FieldTrait;

class PermissionsField implements FieldInterface
{
    use FieldTrait;

    public static function new(string $propertyName, ?string $label = null)
    {
        return (new self())
            ->setProperty($propertyName)
            ->setFormType(PermissionsFormType::class)
            ->setLabel($label)
        ;
    }
}

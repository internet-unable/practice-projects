<?php

namespace App\Controller\Admin\Field;

use App\Controller\Admin\Form\AddressType;
use EasyCorp\Bundle\EasyAdminBundle\Contracts\Field\FieldInterface;
use EasyCorp\Bundle\EasyAdminBundle\Field\FieldTrait;
use Symfony\Contracts\Translation\TranslatableInterface;

final class AddressField implements FieldInterface
{
    use FieldTrait;

    /**
     * @param TranslatableInterface|string|false|null $label
     */
    public static function new(string $propertyName, $label = null): self
    {
        return (new self())
            ->setProperty($propertyName)
            ->setLabel(false)
            ->setTemplateName('crud/field/association')
            ->setFormType(AddressType::class)
            ->addCssClass('field-collection')
            ->setDefaultColumns('col-md-8 col-xxl-7');
    }
}

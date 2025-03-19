<?php

namespace App\Controller\Admin\Field;

use EasyCorp\Bundle\EasyAdminBundle\Contracts\Field\FieldInterface;
use EasyCorp\Bundle\EasyAdminBundle\Field\FieldTrait;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Contracts\Translation\TranslatableInterface;

final class AutocompleteDependentField implements FieldInterface
{
    use FieldTrait;

    public const OPTION_EMBEDDED_CRUD_FORM_CONTROLLER = 'crudControllerFqcn';
    /** @internal this option is intended for internal use only */
    public const OPTION_RELATED_URL = 'relatedUrl';
    /** @internal this option is intended for internal use only */
    public const PARAM_AUTOCOMPLETE_CONTEXT = 'autocompleteContext';
    /** @internal this option is intended for internal use only */
    public const OPTION_DOCTRINE_ASSOCIATION_TYPE = 'associationType';

    public const OPTION_DEPENDS_FROM_PROPERTY_NAME = 'dependsFromPropertyName';
    public const OPTION_DEPENDS_FROM_HTML_SELECTOR = 'dependsFromHtmlSelector';

    /**
     * @param TranslatableInterface|string|false|null $label
     */
    public static function new(string $propertyName, $label = null): self
    {
        return (new self())
            ->setProperty($propertyName)
            ->setLabel($label)
            ->setTemplateName('crud/field/association')
            ->setFormType(EntityType::class)
            ->addCssClass('field-association')
            ->setDefaultColumns('col-md-7 col-xxl-6')
            ->setCustomOption(self::OPTION_RELATED_URL, null)
            ->setCustomOption(self::OPTION_DEPENDS_FROM_PROPERTY_NAME, null)
            ->setCustomOption(self::OPTION_DEPENDS_FROM_HTML_SELECTOR, null);
    }

    public function dependsFrom(string $propertyName, string $htmlSelector): self
    {
        $this->setCustomOption(self::OPTION_DEPENDS_FROM_PROPERTY_NAME, $propertyName);
        $this->setCustomOption(self::OPTION_DEPENDS_FROM_HTML_SELECTOR, $htmlSelector);

        return $this;
    }
}

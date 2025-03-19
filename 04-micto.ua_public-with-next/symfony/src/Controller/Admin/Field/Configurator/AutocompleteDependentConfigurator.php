<?php

namespace App\Controller\Admin\Field\Configurator;

use App\Controller\Admin\Field\AutocompleteDependentField;
use Doctrine\ORM\PersistentCollection;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Config\Option\EA;
use EasyCorp\Bundle\EasyAdminBundle\Config\Option\TextAlign;
use EasyCorp\Bundle\EasyAdminBundle\Context\AdminContext;
use EasyCorp\Bundle\EasyAdminBundle\Contracts\Field\FieldConfiguratorInterface;
use EasyCorp\Bundle\EasyAdminBundle\Dto\EntityDto;
use EasyCorp\Bundle\EasyAdminBundle\Dto\FieldDto;
use EasyCorp\Bundle\EasyAdminBundle\Factory\ControllerFactory;
use EasyCorp\Bundle\EasyAdminBundle\Factory\EntityFactory;
use EasyCorp\Bundle\EasyAdminBundle\Form\Type\CrudAutocompleteType;
use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGenerator;
use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGeneratorInterface;
use Symfony\Component\DependencyInjection\Attribute\AutoconfigureTag;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Contracts\Translation\TranslatorInterface;
use function Symfony\Component\Translation\t;

#[AutoconfigureTag('ea.field_configurator')]
final class AutocompleteDependentConfigurator implements FieldConfiguratorInterface
{
    private EntityFactory $entityFactory;
    private AdminUrlGeneratorInterface $adminUrlGenerator;
    private RequestStack $requestStack;
    private ControllerFactory $controllerFactory;
    private TranslatorInterface $translator;

    public function __construct(
        EntityFactory $entityFactory,
        AdminUrlGenerator $adminUrlGenerator,
        RequestStack $requestStack,
        ControllerFactory $controllerFactory,
        TranslatorInterface $translator
    ) {
        $this->entityFactory = $entityFactory;
        $this->adminUrlGenerator = $adminUrlGenerator;
        $this->requestStack = $requestStack;
        $this->controllerFactory = $controllerFactory;
        $this->translator = $translator;
    }

    public function supports(FieldDto $field, EntityDto $entityDto): bool
    {
        return AutocompleteDependentField::class === $field->getFieldFqcn();
    }

    public function configure(FieldDto $field, EntityDto $entityDto, AdminContext $context): void
    {
        $propertyName = $field->getProperty();
        if (!$entityDto->isAssociation($propertyName)) {
            throw new \RuntimeException(sprintf('The "%s" field is not a Doctrine association, so it cannot be used as an association field.', $propertyName));
        }

        $dependsFromPropertyName = $field->getCustomOption(AutocompleteDependentField::OPTION_DEPENDS_FROM_PROPERTY_NAME);
        $dependsFromHtmlSelector = $field->getCustomOption(AutocompleteDependentField::OPTION_DEPENDS_FROM_HTML_SELECTOR);

        $targetEntityFqcn = $field->getDoctrineMetadata()->get('targetEntity');
        // the target CRUD controller can be NULL; in that case, field value doesn't link to the related entity
        $targetCrudControllerFqcn = $context->getCrudControllers()->findCrudFqcnByEntityFqcn($targetEntityFqcn);

        $field->setCustomOption(AutocompleteDependentField::OPTION_EMBEDDED_CRUD_FORM_CONTROLLER, $targetCrudControllerFqcn);
        $field->setFormTypeOption('attr.data-ea-widget', 'ea-autocomplete-with-dependency');

        // check for embedded associations
        $propertyNameParts = explode('.', $propertyName);
        if (\count($propertyNameParts) > 1) {
            throw new \RuntimeException(sprintf('The "%s" field has embedded associations which are not supported', $field->getProperty()));
        } else {
            if ($entityDto->isToOneAssociation($propertyName)) {
                $this->configureToOneAssociation($field);
            }

            if ($entityDto->isToManyAssociation($propertyName)) {
                $this->configureToManyAssociation($field);
            }
        }

        $targetCrudControllerFqcn = $field->getCustomOption(AutocompleteDependentField::OPTION_EMBEDDED_CRUD_FORM_CONTROLLER);
        if (null === $targetCrudControllerFqcn) {
            throw new \RuntimeException(sprintf('The "%s" field cannot be autocompleted because it doesn\'t define the related CRUD controller FQCN with the "setCrudController()" method.', $field->getProperty()));
        }

        $field->setFormType(CrudAutocompleteType::class);
        $autocompleteEndpointUrl = $this->adminUrlGenerator
            ->unsetAll()
            ->set('page', 1) // The autocomplete should always start on the first page
            ->setController($field->getCustomOption(AutocompleteDependentField::OPTION_EMBEDDED_CRUD_FORM_CONTROLLER))
            ->setAction('autocomplete')
            ->set(AutocompleteDependentField::PARAM_AUTOCOMPLETE_CONTEXT, [
                EA::CRUD_CONTROLLER_FQCN => $context->getRequest()->query->get(EA::CRUD_CONTROLLER_FQCN),
                'propertyName' => $propertyName,
                'originatingPage' => $context->getCrud()->getCurrentPage(),
            ])
            ->generateUrl();

        $field->setFormTypeOption('attr.data-ea-autocomplete-endpoint-url', $autocompleteEndpointUrl);
        $field->setFormTypeOption('attr.data-ea-depends-from-property-name', sprintf('filter[%s]', $dependsFromPropertyName));
        $field->setFormTypeOption('attr.data-ea-depends-from-html-selector', $dependsFromHtmlSelector);
        $field->setFormTypeOption('attr.data-ea-i18n-no-results-found', $this->translator->trans(
            'autocomplete.no-results-found', [], 'EasyAdminBundle'
        ));
        $field->setFormTypeOption('attr.data-ea-i18n-no-more-results', $this->translator->trans(
            'autocomplete.no-more-results', [], 'EasyAdminBundle'
        ));
        $field->setFormTypeOption('attr.data-ea-i18n-loading-more-results', $this->translator->trans(
            'autocomplete.loading-more-results', [], 'EasyAdminBundle'
        ));
    }

    private function configureToOneAssociation(FieldDto $field): void
    {
        $field->setCustomOption(AutocompleteDependentField::OPTION_DOCTRINE_ASSOCIATION_TYPE, 'toOne');

        if (false === $field->getFormTypeOption('required')) {
            $field->setFormTypeOptionIfNotSet('attr.placeholder', t('label.form.empty_value', [], 'EasyAdminBundle'));
        }

        $targetEntityFqcn = $field->getDoctrineMetadata()->get('targetEntity');
        $targetCrudControllerFqcn = $field->getCustomOption(AutocompleteDependentField::OPTION_EMBEDDED_CRUD_FORM_CONTROLLER);

        $targetEntityDto = null === $field->getValue()
            ? $this->entityFactory->create($targetEntityFqcn)
            : $this->entityFactory->createForEntityInstance($field->getValue());
        $field->setFormTypeOptionIfNotSet('class', $targetEntityDto->getFqcn());

        $field->setCustomOption(AutocompleteDependentField::OPTION_RELATED_URL, $this->generateLinkToAssociatedEntity($targetCrudControllerFqcn, $targetEntityDto));

        $field->setFormattedValue($this->formatAsString($field->getValue(), $targetEntityDto));
    }

    private function configureToManyAssociation(FieldDto $field): void
    {
        $field->setCustomOption(AutocompleteDependentField::OPTION_DOCTRINE_ASSOCIATION_TYPE, 'toMany');

        $field->setFormTypeOptionIfNotSet('multiple', true);

        /* @var PersistentCollection $collection */
        $field->setFormTypeOptionIfNotSet('class', $field->getDoctrineMetadata()->get('targetEntity'));

        if (null === $field->getTextAlign()) {
            $field->setTextAlign(TextAlign::RIGHT);
        }

        $field->setFormattedValue($this->countNumElements($field->getValue()));
    }

    private function formatAsString($entityInstance, EntityDto $entityDto): ?string
    {
        if (null === $entityInstance) {
            return null;
        }

        if (method_exists($entityInstance, '__toString')) {
            return (string) $entityInstance;
        }

        if (null !== $primaryKeyValue = $entityDto->getPrimaryKeyValue()) {
            return sprintf('%s #%s', $entityDto->getName(), $primaryKeyValue);
        }

        return $entityDto->getName();
    }

    private function generateLinkToAssociatedEntity(?string $crudController, EntityDto $entityDto): ?string
    {
        if (null === $crudController) {
            return null;
        }

        // TODO: check if user has permission to see the related entity
        return $this->adminUrlGenerator
            ->setController($crudController)
            ->setAction(Action::DETAIL)
            ->setEntityId($entityDto->getPrimaryKeyValue())
            ->unset(EA::MENU_INDEX)
            ->unset(EA::SUBMENU_INDEX)
            ->includeReferrer()
            ->generateUrl();
    }

    private function countNumElements($collection): int
    {
        if (null === $collection) {
            return 0;
        }

        if (is_countable($collection)) {
            return \count($collection);
        }

        if ($collection instanceof \Traversable) {
            return iterator_count($collection);
        }

        return 0;
    }
}

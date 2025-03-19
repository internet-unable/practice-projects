<?php

namespace App\Controller\Admin;

use App\Controller\Admin\Field\AutocompleteDependentField;
use App\Entity\OTG;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Config\Filters;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\Field;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\NumberField;
use EasyCorp\Bundle\EasyAdminBundle\Filter\EntityFilter;

class OTGCrudController extends AbstractCrudController
{
    use AutocompleteWithDependencyTrait;

    public static function getEntityFqcn(): string
    {
        return OTG::class;
    }

    public function configureCrud(Crud $crud): Crud
    {
        return parent::configureCrud($crud)
            ->setEntityLabelInPlural('otg.plural_title')
            ->setEntityLabelInSingular('otg.singular_title')
            ->setDefaultSort(['name' => 'ASC']);
    }

    public function configureActions(Actions $actions): Actions
    {
        return $actions
            ->add(Crud::PAGE_EDIT, Action::INDEX)
            ->add(Crud::PAGE_NEW, Action::INDEX);
    }

    public function configureFilters(Filters $filters): Filters
    {
        // TODO: Додати залежності, щоб при виборі обл підбирались відповідні райони і т.д.
        // TODO: Додати автокомплтіт
        return $filters
            ->add(EntityFilter::new('area'))
            ->add(EntityFilter::new('district'));
    }

    public function configureFields(string $pageName): iterable
    {
        if ($pageName === Crud::PAGE_EDIT || $pageName === Crud::PAGE_NEW) {
            return $this->getEditFields();
        } else {
            return $this->getIndexFields();
        }
    }

    private function getIndexFields(): iterable
    {
        yield IdField::new('id')->onlyOnIndex();
        yield Field::new('name', 'TU.name');
        yield AssociationField::new('area', 'area.singular_title')->autocomplete();
        yield AutocompleteDependentField::new('district', 'district.singular_title')
            ->dependsFrom('area', '#OTG_area_autocomplete');
        yield Field::new('katottg', 'TU.katottg');
        yield NumberField::new('oldId', 'TU.old_id')
                ->hideOnIndex()
                ->hideWhenCreating()
                ->setDisabled();
    }

    private function getEditFields(): iterable
    {
        return $this->getIndexFields();
    }
}

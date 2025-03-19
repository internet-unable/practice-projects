<?php

namespace App\Controller\Admin;

use App\Controller\Admin\Filters\ChildFieldFilter;
use App\Entity\CityDistrict;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Config\Filters;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\Field;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\NumberField;
use EasyCorp\Bundle\EasyAdminBundle\Field\SlugField;

class CityDistrictCrudController extends AbstractCrudController
{
    use AutocompleteWithDependencyTrait;

    public static function getEntityFqcn(): string
    {
        return CityDistrict::class;
    }

    public function configureCrud(Crud $crud): Crud
    {
        return parent::configureCrud($crud)
            ->setEntityLabelInPlural('city_district.plural_title')
            ->setEntityLabelInSingular('city_district.singular_title')
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
        return $filters
            ->add('name')
            ->add('katottg')
            ->add(ChildFieldFilter::new('city', 'name', 'city.filter.name_field'))
            //->add(EntityFilter::new('city')) //not works: out of memory
        ;
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
        yield IdField::new('id');
        yield Field::new('name', 'TU.name');
        yield SlugField::new('slug', 'TU.slug')
            ->setTargetFieldName('name');
        yield AssociationField::new('city', 'city.singular_title');
        yield Field::new('katottg', 'TU.katottg');
    }

    private function getEditFields(): iterable
    {
        yield Field::new('name', 'TU.name');
        yield SlugField::new('slug', 'TU.slug')
            ->setTargetFieldName('name');
        yield AssociationField::new('city', 'city.singular_title')
            ->setCustomOption(AssociationField::OPTION_AUTOCOMPLETE, true);
        yield Field::new('katottg', 'TU.katottg');
        yield NumberField::new('oldId', 'TU.old_id')
            ->setDisabled();
    }
}

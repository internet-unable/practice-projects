<?php

namespace App\Controller\Admin;

use App\Entity\Institution\InstitutionUnitType;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Config\Filters;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\Field;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\NumberField;
use EasyCorp\Bundle\EasyAdminBundle\Field\SlugField;

class InstitutionTypeCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return InstitutionUnitType::class;
    }

    public function configureCrud(Crud $crud): Crud
    {
        return parent::configureCrud($crud)
            ->setEntityLabelInPlural('institution_type.plural_title')
            ->setEntityLabelInSingular('institution_type.singular_title')
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
            ->add('name');
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
        yield Field::new('name', 'institution.name');
        yield SlugField::new('slug', 'institution.slug')
            ->setTargetFieldName('name');
        yield NumberField::new('oldId', 'institution.old_id')
            ->hideOnIndex()
            ->hideWhenCreating()
            ->setDisabled();
    }

    private function getEditFields(): iterable
    {
        return $this->getIndexFields();
    }
}

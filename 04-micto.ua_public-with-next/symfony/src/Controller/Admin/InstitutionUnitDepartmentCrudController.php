<?php

namespace App\Controller\Admin;

use App\Controller\Admin\Form\ContactEmailType;
use App\Controller\Admin\Form\ContactPhoneType;
use App\Controller\Admin\Form\UnitDepartmentScheduleType;
use App\Entity\Institution\InstitutionUnitDepartment;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Config\Filters;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\CollectionField;
use EasyCorp\Bundle\EasyAdminBundle\Field\Field;
use EasyCorp\Bundle\EasyAdminBundle\Field\FormField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\NumberField;
use EasyCorp\Bundle\EasyAdminBundle\Field\SlugField;

class InstitutionUnitDepartmentCrudController extends AbstractCrudController
{
    use AutocompleteWithDependencyTrait;

    public static function getEntityFqcn(): string
    {
        return InstitutionUnitDepartment::class;
    }

    public function configureActions(Actions $actions): Actions
    {
        $actions->add(Crud::PAGE_EDIT, Action::INDEX);
        $actions->add(Crud::PAGE_NEW, Action::INDEX);

        return $actions;
    }

    public function configureCrud(Crud $crud): Crud
    {
        return parent::configureCrud($crud)
            ->setEntityLabelInPlural('institution_department.plural_title')
            ->setEntityLabelInSingular('institution_department.singular_title')
            ->setDefaultSort(['name' => 'ASC'])
            ->setPaginatorPageSize(25);
    }

    public function configureFilters(Filters $filters): Filters
    {
        return $filters
            ->add('name')
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
        yield IdField::new('id')->onlyOnIndex();
        yield BooleanField::new('isPublished', 'common.is_published')->setDisabled();
        yield Field::new('name', 'institution.name');
        yield Field::new('number', 'institution_department.number');
        yield AssociationField::new('unit', 'institution_unit.singular_title');
        yield SlugField::new('slug', 'TU.slug')->setTargetFieldName('name');
    }

    private function getEditFields(): iterable
    {
        //-- General
        yield FormField::addTab('common.general')
            ->setIcon('info-circle');

        yield FormField::addColumn(6);
        yield BooleanField::new('isPublished', 'common.is_published');
        yield AssociationField::new('unit', 'institution_unit.singular_title')
            ->autocomplete();
        yield Field::new('name', 'institution.name');
        yield Field::new('fullName', 'common.full_name');
        yield SlugField::new('slug', 'institution.slug')->setTargetFieldName('name');
        yield Field::new('number', 'institution_department.number');
        yield NumberField::new('oldId', 'TU.old_id')->setDisabled();

        //-- Contacts
        yield FormField::addTab('common.contacts')
            ->setIcon('phone');

        yield FormField::addColumn(6);
        yield CollectionField::new('phones', 'contacts.phones')
            ->setEntryType(ContactPhoneType::class)
            ->allowAdd()
            ->allowDelete()
            ->addFormTheme('admin/collection_entry_row.html.twig')
            ->setFormTypeOptions([
                'by_reference' => false,
            ]);

        yield FormField::addColumn(6);
        yield CollectionField::new('emails', 'contacts.emails')
            ->setEntryType(ContactEmailType::class)
            ->allowAdd()
            ->allowDelete()
            ->addFormTheme('admin/collection_entry_row.html.twig')
            ->setFormTypeOptions([
                'by_reference' => false,
            ]);

        //-- schedule
        yield FormField::addTab('common.schedule')
            ->setIcon('phone');

        yield FormField::addColumn(6);
        yield CollectionField::new('schedule')
            ->setEntryType(UnitDepartmentScheduleType::class)
            ->setLabel(false)
            ->allowAdd()
            ->allowDelete()
            ->setFormTypeOptions([
                'by_reference' => false,
            ]);
        ;
    }
}

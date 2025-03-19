<?php

namespace App\Controller\Admin;

use App\Controller\Admin\Field\AddressField;
use App\Controller\Admin\Field\AutocompleteDependentField;
use App\Controller\Admin\Form\ContactEmailType;
use App\Controller\Admin\Form\ContactPhoneType;
use App\Controller\Admin\Form\UnitScheduleType;
use App\Entity\Institution\InstitutionUnit;
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
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class InstitutionUnitCrudController extends AbstractCrudController
{
    use AutocompleteWithDependencyTrait;

    public static function getEntityFqcn(): string
    {
        return InstitutionUnit::class;
    }

    public function configureCrud(Crud $crud): Crud
    {
        return parent::configureCrud($crud)
            ->setEntityLabelInPlural('institution_unit.plural_title')
            ->setEntityLabelInSingular('institution_unit.singular_title')
            ->setDefaultSort(['id' => 'DESC']);
    }

    public function configureActions(Actions $actions): Actions
    {
        return $actions
            ->add(Crud::PAGE_EDIT, Action::INDEX)
            ->add(Crud::PAGE_NEW, Action::INDEX);
    }


    public function configureFields(string $pageName): iterable
    {
        if ($pageName === Crud::PAGE_EDIT || $pageName === Crud::PAGE_NEW) {
            return $this->getEditFields($pageName);
        } else {
            return $this->getIndexFields();
        }
    }

    public function configureFilters(Filters $filters): Filters
    {
        return $filters
            ->add('name')
        ;
    }

    private function getIndexFields(): iterable
    {
        yield IdField::new('id')->hideOnForm();
        yield BooleanField::new('isPublished', 'common.is_published')->setDisabled();
        yield Field::new('name', 'institution.name');
        yield AssociationField::new('city', 'city.singular_title');
        yield Field::new('edrpou', 'institution.edrpou');
        yield AssociationField::new('type', 'institution_type.singular_title');
        yield AssociationField::new('address', 'institution.address');
    }

    private function getEditFields(string $pageName): iterable
    {
        //-- General
        yield FormField::addTab('common.general')
            ->setIcon('info-circle');

        yield FormField::addColumn(6);
        yield BooleanField::new('isPublished', 'common.is_published');
        yield AssociationField::new('institution', 'institution.singular_title')
            ->setDisabled($pageName === Crud::PAGE_EDIT)
            ->autocomplete();
        yield Field::new('name', 'institution.name');
        yield Field::new('fullName', 'common.full_name');
        yield SlugField::new('slug', 'institution.slug')
            ->setTargetFieldName('name');
        yield AssociationField::new('type', 'institution_type.singular_title')
            ->autocomplete();
        yield NumberField::new('oldId', 'institution.old_id')->setDisabled();

        yield FormField::addColumn(6);
        yield Field::new('chiefName', 'institution.chief_name');
        yield Field::new('headDoctorName', 'institution.head_doctor_name');
        yield TextField::new('edrpou', 'institution.edrpou')
            ->setFormTypeOptions([
                'attr' => [
                    'maxlength' => 8
                ]
            ]);
        yield TextEditorField::new('description', 'institution.description');

        //-- Address
        yield FormField::addTab('common.address')
            ->setIcon('map-marker');

        yield FormField::addColumn(6);
        yield AssociationField::new('city', 'city.singular_title')
            ->autocomplete();
        yield AutocompleteDependentField::new('cityDistrict', 'city_district.singular_title')
            ->dependsFrom('city', '#InstitutionUnit_city_autocomplete');
        yield AddressField::new('address')
            ->setRequired(true);

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
            ->setEntryType(UnitScheduleType::class)
            ->setLabel(false)
            ->allowAdd()
            ->allowDelete()
            ->setFormTypeOptions([
                'by_reference' => false,
            ]);
        ;
    }
}

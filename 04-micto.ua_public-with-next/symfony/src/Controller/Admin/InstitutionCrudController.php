<?php

namespace App\Controller\Admin;

use App\Entity\Institution\Institution;
use App\Entity\Institution\OwnershipForm;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Config\Filters;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\Field;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\SlugField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use Symfony\Component\Form\Extension\Core\Type\EnumType;
use function Symfony\Component\Translation\t;

class InstitutionCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Institution::class;
    }

    public function configureCrud(Crud $crud): Crud
    {
        return parent::configureCrud($crud)
            ->setEntityLabelInPlural('institution.plural_title')
            ->setEntityLabelInSingular('institution.singular_title')
            ->setDefaultSort(['id' => 'DESC']);
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
            ->add('id')
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
        yield BooleanField::new('isPublished', 'common.is_published')->setDisabled();
        yield Field::new('name', 'institution.name');
        yield ChoiceField::new('ownershipForm', 'institution.ownership_form')
            ->formatValue(fn (\UnitEnum $choice) => t(sprintf('institution.ownership.%s', $choice->name), [], 'admin'));
    }

    private function getEditFields(): iterable
    {
        yield BooleanField::new('isPublished', 'common.is_published');
        yield Field::new('name', 'institution.name');
        yield Field::new('fullName', 'common.full_name');
        yield SlugField::new('slug', 'institution.slug')
            ->setTargetFieldName('name');
        yield ChoiceField::new('ownershipForm', 'institution.ownership_form')
            ->setFormType(EnumType::class)
            ->setFormTypeOption(
                'choice_label',
                static fn (\UnitEnum $choice) => sprintf('institution.ownership.%s', $choice->name)
            )
            ->setFormTypeOption('class', OwnershipForm::class);
        yield TextEditorField::new('description', 'institution.description');
    }
}

<?php

namespace App\Controller\Admin;

use App\Controller\Admin\Field\AutocompleteDependentField;
use App\Entity\UserEntity\UserEntityPermission;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Config\Filters;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Filter\EntityFilter;
use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGenerator;
use SoftUa\UserBundle\Configuration\Permission\UserBundlePermissions;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Contracts\Translation\TranslatorInterface;

#[IsGranted(UserBundlePermissions::USERS_ENTITY_ACCESS)]
class UserEntityCrudController extends AbstractCrudController
{
    public function __construct(
        private readonly AdminUrlGenerator $adminUrlGenerator,
        private readonly TranslatorInterface $translator,
    ) {}

    public static function getEntityFqcn(): string
    {
        return UserEntityPermission::class;
    }

    public function configureCrud(Crud $crud): Crud
    {
        return parent::configureCrud($crud)
            ->setEntityLabelInPlural('user_entity.plural_title')
            ->setEntityLabelInSingular('user_entity.singular_title')
            ->setDefaultSort(['id' => 'DESC'])
            ->setPaginatorPageSize(25);
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
            ->add(EntityFilter::new('user', 'user.singular_title'))
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
        yield AssociationField::new('user', 'user.singular_title');
        yield AssociationField::new('institution', 'institution.singular_title');
        yield AssociationField::new('institutionUnit', 'institution_unit.singular_title')
            ->setTemplatePath('admin/field/association_null.html.twig');
        yield AssociationField::new('unitDepartment', 'institution_department.singular_title')
            ->setTemplatePath('admin/field/association_null.html.twig');
    }

    private function getEditFields(): iterable
    {
        yield AssociationField::new('user', 'user.singular_title')->autocomplete();
        yield AssociationField::new('institution', 'institution.singular_title')->autocomplete();

        yield AutocompleteDependentField::new('institutionUnit', 'institution_unit.singular_title')
            ->dependsFrom('institution', '#UserEntityPermission_institution_autocomplete');

        yield AutocompleteDependentField::new('unitDepartment', 'institution_department.singular_title')
            ->dependsFrom('unit', '#UserEntityPermission_institutionUnit_autocomplete');

    }
}

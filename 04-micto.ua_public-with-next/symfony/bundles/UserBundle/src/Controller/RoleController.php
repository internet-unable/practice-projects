<?php

namespace SoftUa\UserBundle\Controller;

use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use SoftUa\UserBundle\Admin\FormTypes\UppercaseText\UppercaseTextType;
use SoftUa\UserBundle\Configuration\Permission\UserBundlePermissions;
use SoftUa\UserBundle\Entity\Role;
use SoftUa\UserBundle\Security\BundlePermissionsRepository;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[IsGranted(UserBundlePermissions::ROLES_MANAGEMENT)]
class RoleController extends AbstractCrudController
{
    public function __construct(
        private readonly BundlePermissionsRepository $permissionsRepository,
    ){}

    public static function getEntityFqcn(): string
    {
        return Role::class;
    }

    public function configureActions(Actions $actions): Actions
    {
        return $actions
            ->add(Crud::PAGE_EDIT, Action::INDEX)
            ->add(Crud::PAGE_NEW, Action::INDEX);
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setEntityLabelInSingular('role.single_title')
            ->setEntityLabelInPlural('role.plural_title');
    }

    public function configureFields(string $pageName): iterable
    {
        yield IdField::new('id')
            ->onlyOnIndex();

        yield TextField::new('code', 'role.code')
            ->setFormType(UppercaseTextType::class);
        yield TextField::new('code', 'role.code')
            ->setFormType(UppercaseTextType::class)
            ->setDisabled()
            ->onlyWhenUpdating();

        yield TextField::new('description', 'role.description');

        yield AssociationField::new('permissions', 'role.permissions')
            ->setFormTypeOption('choice_label', 'code')
            ->formatValue(function ($value, Role $role) {
                return implode('<br>', $role->getPermissionCodes());
            })
        ->onlyOnIndex();

        yield from $this->getPermissionsEditField();
    }

    private function getPermissionsEditField(): iterable
    {
        yield ChoiceField::new('permissionCodes', 'role.permissions')
            ->setChoices(function() {
                return array_flip($this->permissionsRepository->getPermissions());
            })
            ->allowMultipleChoices()
            ->renderExpanded()
            ->renderAsNativeWidget()
            ->onlyOnForms();
    }
}

<?php

namespace SoftUa\UserBundle\Controller;

use Doctrine\ORM\QueryBuilder;
use EasyCorp\Bundle\EasyAdminBundle\Collection\FieldCollection;
use EasyCorp\Bundle\EasyAdminBundle\Collection\FilterCollection;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Config\Filters;
use EasyCorp\Bundle\EasyAdminBundle\Config\KeyValueStore;
use EasyCorp\Bundle\EasyAdminBundle\Config\Option\EA;
use EasyCorp\Bundle\EasyAdminBundle\Context\AdminContext;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Dto\EntityDto;
use EasyCorp\Bundle\EasyAdminBundle\Dto\SearchDto;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Filter\BooleanFilter;
use EasyCorp\Bundle\EasyAdminBundle\Filter\EntityFilter;
use EasyCorp\Bundle\EasyAdminBundle\Filter\TextFilter;
use EasyCorp\Bundle\EasyAdminBundle\Orm\EntityRepository;
use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGenerator;
use SoftUa\UserBundle\Configuration\Permission\UserBundlePermissions;
use SoftUa\UserBundle\Entity\User;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Http\Attribute\IsGranted;

class UserController extends AbstractCrudController
{
    public function __construct(
        private readonly UserPasswordHasherInterface $userPasswordHasher,
        private readonly Security $security,
    ) {}

    public static function getEntityFqcn(): string
    {
        return User::class;
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
            ->setEntityLabelInSingular('user.single_title')
            ->setEntityLabelInPlural('user.plural_title')
        ;
    }

    public function configureFilters(Filters $filters): Filters
    {
        return $filters
            ->add(TextFilter::new('email', 'user.email'))
            ->add(BooleanFilter::new('isActive', 'user.is_active'))
            ->add(BooleanFilter::new('isAdminUser', 'user.is_admin'))
            ->add(BooleanFilter::new('isInstitution', 'user.is_institution'))
        ;
    }

    public function configureFields(string $pageName): iterable
    {
        yield IdField::new('id')
            ->onlyOnIndex();

        yield BooleanField::new('isActive', 'user.is_active')->setDisabled()->onlyOnIndex();
        yield BooleanField::new('isActive', 'user.is_active')
            ->hideOnIndex()
            ->setPermission('USERS_MANAGEMENT')
        ;

        yield BooleanField::new('isAdminUser', 'user.is_admin')
            ->hideOnIndex()
            ->setPermission('USERS_MANAGEMENT')
        ;

        yield BooleanField::new('isInstitution', 'user.is_institution')
            ->hideOnIndex()
            ->setPermission('USERS_MANAGEMENT')
        ;

        yield TextField::new('email', 'user.email');
        yield TextField::new('email', 'user.email')
            ->setDisabled()
            ->onlyWhenUpdating();

        yield TextField::new('firstName', 'user.first_name');
        yield TextField::new('lastName', 'user.last_name');
        yield TextField::new('middleName', 'user.middle_name');
        yield from $this->getRolesField();
        yield from $this->getPasswordField();
    }

    private function getRolesField(): iterable
    {
        yield AssociationField::new('rolesCollection', 'role.plural_title')
            ->setFormTypeOption('choice_label', 'code')
            ->formatValue(function ($value, User $user) {
                $roles = [];

                foreach ($user->getRolesCollection() as $role) {
                    $roles[] = $role->getCode();
                }

                return implode(', ', $roles);
            })
            ->onlyOnIndex();

        yield AssociationField::new('rolesCollection', 'role.plural_title')
            ->setFormTypeOption('choice_label', 'code')
            ->setRequired(true)
            ->setColumns(5)
            ->onlyOnForms()
            ->setPermission('USERS_MANAGEMENT')
        ;
    }

    private function getPasswordField(): iterable
    {
        $options = [
            'type' => PasswordType::class,
            'first_options' => [
                'label' => 'user.password',
                'always_empty' => false,
                'trim' => true,
                'row_attr' => ['class' => 'col-md-6 col-xxl-5'],
            ],
            'second_options' => [
                'label' => 'user.password_repeat',
                'always_empty' => false,
                'trim' => true,
                'row_attr' => ['class' => 'col-md-6 col-xxl-5'],
            ],
            'mapped' => false,
        ];

        yield TextField::new('password', 'user.password')
            ->setFormType(RepeatedType::class)
            ->setFormTypeOptions($options)
            ->setRequired(true)
            ->onlyWhenCreating();

        yield TextField::new('password')
            ->setFormType(RepeatedType::class)
            ->setFormTypeOptions($options)
            ->setRequired(false)
            ->onlyWhenUpdating();
    }

    public function createIndexQueryBuilder(SearchDto $searchDto, EntityDto $entityDto, FieldCollection $fields, FilterCollection $filters): QueryBuilder
    {
        $query = $this->container->get(EntityRepository::class)
            ->createQueryBuilder($searchDto, $entityDto, $fields, $filters);

        // Show only current user if has no rights
        if (!$this->isGranted(UserBundlePermissions::USERS_MANAGEMENT)) {
            $query->where('entity.id = '.$this->getUser()->getId());
        }

        return $query;
    }

    public function edit(AdminContext $context)
    {
        $user = $this->getUser();
        $id = $context->getEntity()->getInstance()->getId();

        if (!$this->security->isGranted('USERS_MANAGEMENT', $user) && $user->getId() !== $id) {
            $this->addFlash('danger', 'You cannot edit users');

            return $this->redirect($this->container->get(AdminUrlGenerator::class)->setAction(Action::INDEX)->unset(EA::ENTITY_ID)->generateUrl());
        } else {
            return parent::edit($context);
        }
    }

    #[IsGranted('USERS_MANAGEMENT')]
    public function delete(AdminContext $context): Response
    {
        $user = $this->getUser();
        $id = $context->getEntity()->getInstance()->getId();

        if ($user->getId() === $id) {
            $this->addFlash('danger', 'You cannot delete your own account');

            return $this->redirect($this->container->get(AdminUrlGenerator::class)->setAction(Action::INDEX)->unset(EA::ENTITY_ID)->generateUrl());
        } else {
            return parent::delete($context);
        }
    }

    public function createNewFormBuilder(EntityDto $entityDto, KeyValueStore $formOptions, AdminContext $context): FormBuilderInterface
    {
        $formBuilder = parent::createNewFormBuilder($entityDto, $formOptions, $context);
        return $this->addPasswordEventListener($formBuilder);
    }

    public function createEditFormBuilder(EntityDto $entityDto, KeyValueStore $formOptions, AdminContext $context): FormBuilderInterface
    {
        $formBuilder = parent::createEditFormBuilder($entityDto, $formOptions, $context);
        return $this->addPasswordEventListener($formBuilder);
    }

    private function addPasswordEventListener(FormBuilderInterface $formBuilder): FormBuilderInterface
    {
        return $formBuilder->addEventListener(FormEvents::POST_SUBMIT, function($event) {
            $form = $event->getForm();
            if (!$form->isValid()) {
                return;
            }
            $password = $form->get('password')->getData();
            if ($password === null) {
                return;
            }

            $user = $event->getData();
            $hash = $this->userPasswordHasher->hashPassword($user, $password);
            $form->getData()->setPassword($hash);
        });
    }
}

<?php

namespace App\Controller\Admin;

use App\Controller\Admin\Field\AutocompleteDependentField;
use App\Entity\Comment;
use App\Entity\CommentType;
use App\Controller\Admin\Field\CommentInstitutionRef;
use Doctrine\ORM\EntityManagerInterface;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Config\Filters;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Config\Assets;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\EmailField;
use EasyCorp\Bundle\EasyAdminBundle\Field\Field;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\NumberField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TelephoneField;
use EasyCorp\Bundle\EasyAdminBundle\Field\FormField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextareaField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Filter\ChoiceFilter;
use EasyCorp\Bundle\EasyAdminBundle\Filter\DateTimeFilter;
use EasyCorp\Bundle\EasyAdminBundle\Form\Type\ComparisonType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\EnumType;
use function Symfony\Component\Translation\t;


class CommentCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Comment::class;
    }

    public function configureFilters(Filters $filters): Filters
    {
        return $filters
            ->add('id')
            ->add('isPublished')
            ->add(ChoiceFilter::new('type')
                ->setChoices($this->getCommentTypeChoices())
                ->setFormTypeOption('translation_domain', 'admin')
            )
            ->add(ChoiceFilter::new('mark')
                ->setChoices([
                    0 => null,
                    1 => '1',
                    2 => '2',
                    3 => '3',
                    4 => '4',
                    5 => '5',
                ])
            )
            ->add('name')
            ->add('text')
            ->add(DateTimeFilter::new('createdAt')
                ->setFormTypeOption('value_type', DateType::class)
                ->setFormTypeOption('comparison_type_options.choices', [
                    'filter.label.is_after' => ComparisonType::GT,
                    'filter.label.is_after_or_same' => ComparisonType::GTE,
                    'filter.label.is_before' => ComparisonType::LT,
                    'filter.label.is_before_or_same' => ComparisonType::LTE,
                    'filter.label.is_between' => ComparisonType::BETWEEN,
                ])
            )
        ;
    }

    public function configureCrud(Crud $crud): Crud
    {
        return parent::configureCrud($crud)
            ->setEntityLabelInPlural('comment.plural_title')
            ->setEntityLabelInSingular('comment.singular_title')
            ->setDateTimeFormat('dd/MM/yyyy HH:mm')
            ->hideNullValues()
            ->showEntityActionsInlined()
            ->setDefaultSort(['id' => 'DESC']);
            
    }

    public function configureActions(Actions $actions): Actions
{
    return $actions
        ->update(Crud::PAGE_INDEX, Action::EDIT, function (Action $action) {
            // return $action->setIcon('fa-solid fa-pencil')->setLabel('common.edit_label');
            return $action->setIcon('fa-solid fa-pencil')->setLabel(false);
        })
        ->update(Crud::PAGE_INDEX, Action::DELETE, function (Action $action) {
            // return $action->setIcon('fa-solid fa-trash')->setLabel('common.delete_label');
            return $action->setIcon('fa-solid fa-trash')->setLabel(false);
        })
    ;
}

    public function configureFields(string $pageName): iterable
    {
        if ($pageName === Crud::PAGE_EDIT || $pageName === Crud::PAGE_NEW) {
            return $this->getEditFields($pageName);
        } else {
            return $this->getIndexFields();
        }
    }

    private function getIndexFields(): iterable
    {
        yield IdField::new('id');
        yield BooleanField::new('isPublished', 'common.is_published');//->setDisabled();
        yield ChoiceField::new('type', 'comment.type_label')
            ->formatValue(fn (\UnitEnum $choice) => t("comment.type.$choice->name", domain: 'admin'));
            // ->setTemplatePath('admin/field/type_field.html.twig');
        yield NumberField::new('mark', 'comment.mark');
        yield Field::new('name', 'comment.name');
        yield TextField::new('text', 'comment.text')
            ->setMaxLength(500)
            ->stripTags();
        // yield AssociationField::new('institution', 'institution.singular_title');
        
        yield TextField::new('entityType', 'comment.link')
            ->onlyOnIndex()
            ->setTemplatePath('admin/field/comment_institution_ref.html.twig');
        yield DateTimeField::new('createdAt', 'common.created_at');
    }

    public function configureAssets(Assets $assets): Assets
    {
        return $assets->addJsFile('admin/commentFieldDependency.js');
    }

    private function getEditFields(string $pageName): iterable
    {
        yield FormField::addTab('Редагування')->setIcon('cog');
        
        yield BooleanField::new('isPublished', 'common.is_published')
            ->setColumns('col-md-12 col-xxl-12')
            ;
        yield ChoiceField::new('mark', 'comment.mark')
            ->setColumns('col-md-12 col-xxl-12')
            ->setFormTypeOption('row_attr', ['class' => 'col-sm-12 col-md-3 col-ld-2'])
            ->setHelp('Оцінка не доступна для відповіді і питання')
            ->setChoices([
                'Немає' => null,
                1 => 1,
                2 => 2,
                3 => 3,
                4 => 4,
                5 => 5,
            ])
            ;

        yield ChoiceField::new('type', 'comment.type_label')
            ->setFormTypeOption('class', CommentType::class)
            ->setColumns('col-md-12 col-xxl-12')
            ->setFormTypeOption('row_attr', ['class' => 'col-sm-12 col-md-3 col-ld-2'])
            // ->setDisabled($pageName === Crud::PAGE_EDIT)
            ->setFormType(EnumType::class)
            ->setFormTypeOption('choice_label',
                static fn (\UnitEnum $choice) => "comment.type.$choice->name");

        yield EmailField::new('email', 'comment.email')
            ->setColumns('col-md-4 col-xxl-4')
            ;
        yield TelephoneField::new('phone', 'comment.phone')
            ->setColumns('col-md-4 col-xxl-4')
        ;
        yield AssociationField::new('user', 'user.single_title')
            ->autocomplete()
            ->setColumns('col-md-4 col-xxl-4');
        yield TextField::new('name', 'comment.name')
            ->setColumns('col-md-12 col-xxl-12')
            ;
        yield TextareaField::new('text', 'comment.text')
        ->setColumns('col-md-12 col-xxl-12');


        yield FormField::addTab('Інформація')
            ->setIcon('info')
            ->addCssClass('optional')
            ->setHelp('Тут все що не можна редагувати');

        yield AssociationField::new('institution', 'institution.singular_title')
            ->setDisabled($pageName === Crud::PAGE_EDIT)
            ->autocomplete()
            ->setFormTypeOption('row_attr', ['class' => 'col']);
        yield AutocompleteDependentField::new('institutionUnit', 'institution_unit.singular_title')
            ->setDisabled($pageName === Crud::PAGE_EDIT)
            ->dependsFrom('institution', '#Comment_institution_autocomplete')
            ->setFormTypeOption('row_attr', ['class' => 'col']);
        yield AutocompleteDependentField::new(
                'institutionUnitDepartment',
                'institution_department.singular_title'
            )
            ->setDisabled($pageName === Crud::PAGE_EDIT)
            ->dependsFrom('unit', '#Comment_institutionUnit_autocomplete');
    }

    public function persistEntity(EntityManagerInterface $entityManager, $entityInstance): void
    {
        $this->validateComment($entityInstance);
        parent::persistEntity($entityManager, $entityInstance);
    }

    public function updateEntity(EntityManagerInterface $entityManager, $entityInstance): void
    {
        $this->validateComment($entityInstance);
        parent::updateEntity($entityManager, $entityInstance);
    }

    private function validateComment(Comment $comment): void
    {
        if (empty($comment->getUser()) && empty($comment->getName())) {
            throw new \Exception('You must provide either a User or a Name for the comment.');
        }
    }

    private function getCommentTypeChoices(): array
    {
        return [
            'comment.type.COMPLAINT' => 'complaint',
            'comment.type.QUESTION' => 'question',
            'comment.type.REVIEW' => 'review',
            'comment.type.REPLY' => 'reply',
            'comment.type.GRATITUDE' => 'gratitude',
        ];
    }
}

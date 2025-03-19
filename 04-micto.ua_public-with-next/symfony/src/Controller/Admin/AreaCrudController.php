<?php

namespace App\Controller\Admin;

use App\Entity\Area;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\Field;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\NumberField;
use EasyCorp\Bundle\EasyAdminBundle\Field\SlugField;

class AreaCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Area::class;
    }

    public function configureCrud(Crud $crud): Crud
    {
        return parent::configureCrud($crud)
            ->setEntityLabelInPlural('area.plural_title')
            ->setEntityLabelInSingular('area.singular_title')
            ->setDefaultSort(['name' => 'ASC'])
            ->setPaginatorPageSize(25);
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
            return $this->getEditFields();
        } else {
            return $this->getIndexFields();
        }
    }

    private function getIndexFields(): iterable
    {
        return [
            IdField::new('id')
                ->onlyOnIndex(),
            Field::new('name', 'TU.name'),
            SlugField::new('slug', 'TU.slug')
                ->setTargetFieldName('name'),
            Field::new('katottg', 'TU.katottg'),
            NumberField::new('oldId', 'TU.old_id')
                ->hideOnIndex()
                ->setDisabled(),
        ];
    }

    private function getEditFields(): iterable
    {
        return $this->getIndexFields();
    }
}

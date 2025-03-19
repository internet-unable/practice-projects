<?php

namespace App\Controller\Admin;

use App\Controller\Admin\Field\AutocompleteDependentField;
use App\Entity\City;
use App\Entity\CityType;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Config\Filters;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\Field;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\NumberField;
use EasyCorp\Bundle\EasyAdminBundle\Field\SlugField;
use EasyCorp\Bundle\EasyAdminBundle\Filter\ChoiceFilter;
use EasyCorp\Bundle\EasyAdminBundle\Filter\EntityFilter;
use EasyCorp\Bundle\EasyAdminBundle\Filter\TextFilter;
use Symfony\Component\Form\Extension\Core\Type\EnumType;
use function Symfony\Component\Translation\t;

class CityCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return City::class;
    }

    public function configureCrud(Crud $crud): Crud
    {
        return parent::configureCrud($crud)
            ->setEntityLabelInPlural('city.plural_title')
            ->setEntityLabelInSingular('city.singular_title')
            ->setDefaultSort(['name' => 'ASC']);
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

    public function configureFilters(Filters $filters): Filters
    {
        // TODO: Додати залежності, щоб при виборі обл підбирались відповідні райони і т.д.
        // TODO: Додати автокомплтіт
        return $filters
            ->add(TextFilter::new('name'))
            ->add(ChoiceFilter::new('type')
                ->setChoices($this->getCityTypeChoices())
                ->setFormTypeOption('translation_domain', 'admin')
            )
            ->add(EntityFilter::new('area'))
            ->add(EntityFilter::new('district'))
            ->add(EntityFilter::new('otg'))
        ;
    }

    private function getIndexFields(): iterable
    {
        yield IdField::new('id');

        yield ChoiceField::new('type', 'TU.type')
            ->formatValue(fn (\UnitEnum $choice) => t("city.type.$choice->name", domain: 'admin'));

        yield Field::new('name', 'TU.name');
        yield AssociationField::new('area', 'area.singular_title');
        yield AssociationField::new('district', 'district.singular_title');
        yield AssociationField::new('otg', 'otg.singular_title');
        yield Field::new('katottg', 'TU.katottg');
    }

    private function getEditFields(): iterable
    {
        yield ChoiceField::new('type', 'TU.type')
            ->setFormType(EnumType::class)
            ->setFormTypeOption('choice_label',
                static fn (\UnitEnum $choice) => "city.type.$choice->name"
            )
            ->setFormTypeOption('class', CityType::class);
        yield Field::new('name', 'TU.name');
        yield SlugField::new('slug', 'TU.slug')
            ->setTargetFieldName('name');
        yield AssociationField::new('area', 'area.singular_title')->autocomplete();
        yield AutocompleteDependentField::new('district', 'district.singular_title')
            ->dependsFrom('area', '#City_area_autocomplete');
        yield AutocompleteDependentField::new('otg', 'otg.singular_title')
            ->dependsFrom('district', '#City_district_autocomplete');
        yield NumberField::new('oldId', 'TU.old_id')->setDisabled();
    }

    private function getCityTypeChoices(): array
    {
        return [
            'city.type.SPECIAL' => CityType::SPECIAL->value,
            'city.type.CITY' => CityType::CITY->value,
            'city.type.VILLAGE' => CityType::VILLAGE->value,
            'city.type.VILLAGE_S' => CityType::VILLAGE_S->value,
            'city.type.SMT' => CityType::SMT->value,
        ];
    }
}

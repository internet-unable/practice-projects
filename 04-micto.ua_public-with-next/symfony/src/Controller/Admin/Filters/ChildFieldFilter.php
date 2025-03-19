<?php

namespace App\Controller\Admin\Filters;

use Doctrine\ORM\QueryBuilder;
use EasyCorp\Bundle\EasyAdminBundle\Contracts\Filter\FilterInterface;
use EasyCorp\Bundle\EasyAdminBundle\Dto\EntityDto;
use EasyCorp\Bundle\EasyAdminBundle\Dto\FieldDto;
use EasyCorp\Bundle\EasyAdminBundle\Dto\FilterDataDto;
use EasyCorp\Bundle\EasyAdminBundle\Filter\FilterTrait;
use EasyCorp\Bundle\EasyAdminBundle\Form\Filter\Type\TextFilterType;

class ChildFieldFilter implements FilterInterface
{
    use FilterTrait;

    private string $childProperty;

    public static function new(string $property, string $childProperty, $label = null): self
    {
        return (new self())
            ->setFilterFqcn(__CLASS__)
            ->setProperty($property)
            ->setChildParamName($childProperty)
            ->setLabel($label)
            ->setFormType(TextFilterType::class)
            ->setFormTypeOption('translation_domain', 'EasyAdminBundle');
    }

    public function apply(
        QueryBuilder $queryBuilder,
        FilterDataDto $filterDataDto,
        ?FieldDto $fieldDto,
        EntityDto $entityDto
    ): void
    {
        $alias = $filterDataDto->getEntityAlias();
        $property = $filterDataDto->getProperty();
        $comparison = $filterDataDto->getComparison();
        $parameterName = $this->childProperty;//$filterDataDto->getParameterName();
        $value = $filterDataDto->getValue();

        $queryBuilder
            ->leftJoin("$alias.$property", 'c')
            ->where("c.$parameterName $comparison :str")
            ->setParameter('str', $value);
    }

    private function setChildParamName(string $name): self
    {
        $this->childProperty = $name;

        return $this;
    }
}

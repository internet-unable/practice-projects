<?php

namespace App\Menu;

use App\Entity\Area;
use App\Entity\City;
use App\Entity\CityDistrict;
use App\Entity\CityType;
use App\Entity\District;
use App\Entity\Institution\Institution;
use App\Entity\Institution\InstitutionUnit;
use App\Service\TerritorialUnitNameFormatter;
use Knp\Menu\FactoryInterface;
use Knp\Menu\ItemInterface;
use Symfony\Contracts\Translation\TranslatorInterface;

class BreadcrumbBuilder
{
    private ItemInterface $breadcrumb;

    public function __construct(
        protected readonly FactoryInterface $factory,
        protected readonly TranslatorInterface $translator,
        protected readonly TerritorialUnitNameFormatter $nameFormatter,
    ) {
        $this->breadcrumb = $factory->createItem('root');
    }

    public function addBreadcrumbItem(string $name, string $route = null, array $routeParameters = [])
    {
        $options = [];

        if ($route) {
            $options = [
                'route' => $route,
                'routeParameters' => $routeParameters,
            ];
        }

        if (!$this->breadcrumb->count()) {
            $this->breadcrumb->addChild($this->translator->trans('nav.home'), [
                'route' => 'home',
                'attributes' => ['class' => 'home'],
            ]);
        }

        $this->breadcrumb->addChild($name, $options);
    }

    public function addInstitutionBreadcrumbItem(Institution $institution, bool $withLink = true)
    {
        if ($withLink) {
            $this->addBreadcrumbItem($institution->getName(), 'institution_page', [
                'id' => $institution->getId(),
                'slug' => $institution->getSlug(),
            ]);
        } else {
            $this->addBreadcrumbItem($institution->getName());
        }
    }

    public function addInstitutionUnitBreadcrumbItem(InstitutionUnit $unit, bool $withLink = true)
    {
        if ($withLink) {
            $this->addBreadcrumbItem($unit->getName().' ', 'institution_unit_page', [
                'id' => $unit->getOldId(),
                'slug' => $unit->getSlug(),
            ]);
        } else {
            $this->addBreadcrumbItem($unit->getName().' ');
        }
    }
    
    public function addTerritorialUnitBreadcrumb(mixed $entity, bool $withLink = false)
    {
        match(true) {
            $entity instanceof Area => $this->addAreaBreadcrumbItem($entity, $withLink),
            $entity instanceof District => $this->addDistrictBreadcrumbItem($entity, $withLink),
            $entity instanceof City => $this->addCityBreadcrumbItem($entity, $withLink),
            $entity instanceof CityDistrict => $this->addCityDistrictBreadcrumbItem($entity, $withLink),
        };
    }

    protected function addAreaBreadcrumbItem(Area $area, bool $withLink = false)
    {
        $name = $this->nameFormatter->getName($area);

        if ($withLink) {
            $this->addBreadcrumbItem($name, 'tu_page', [
                'id' => $area->getOldId(),
                'slug' => $area->getSlug(),
            ]);
        } else {
            $this->addBreadcrumbItem($name);
        }
    }

    protected function addDistrictBreadcrumbItem(District $district, bool $withLink = false)
    {
        $this->addAreaBreadcrumbItem($district->getArea(), true);

        $name = $this->nameFormatter->getName($district);

        if ($withLink) {
            $this->addBreadcrumbItem($name, 'tu_page', [
                'id' => $district->getOldId(),
                'slug' => $district->getSlug(),
            ]);
        } else {
            $this->addBreadcrumbItem($name);
        }
    }

    protected function addCityBreadcrumbItem(City $city, bool $withLink = false)
    {
        if (CityType::SPECIAL == $city->getType() || !$city->getDistrict()) {
            $this->addAreaBreadcrumbItem($city->getArea(), true);
        } else {
            $this->addDistrictBreadcrumbItem($city->getDistrict(), true);
        }

        $name = $this->nameFormatter->getName($city);

        if ($withLink) {
            $this->addBreadcrumbItem($name, 'tu_page', [
                'id' => $city->getOldId(),
                'slug' => $city->getSlug(),
            ]);
        } else {
            $this->addBreadcrumbItem($name);
        }
    }

    protected function addCityDistrictBreadcrumbItem(CityDistrict $cityDistrict, bool $withLink = false)
    {
        $this->addCityBreadcrumbItem($cityDistrict->getCity(), true);

        $name = $this->nameFormatter->getName($cityDistrict);

        if ($withLink) {
            $this->addBreadcrumbItem($name, 'tu_page', [
                'id' => $cityDistrict->getOldId(),
                'slug' => $cityDistrict->getSlug(),
            ]);
        } else {
            $this->addBreadcrumbItem($name);
        }
    }

    /**
     * @param array $options
     *
     * @return ItemInterface
     */
    public function breadcrumb(array $options): ItemInterface
    {
        return $this->breadcrumb;
    }
}

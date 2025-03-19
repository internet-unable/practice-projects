<?php

namespace App\Service;

use App\Entity\Area;
use App\Entity\City;
use App\Entity\CityDistrict;
use App\Entity\District;
use Doctrine\Common\Util\ClassUtils;
use Symfony\Contracts\Translation\TranslatorInterface;

class TerritorialUnitNameFormatter
{
    public function __construct(
        private readonly TranslatorInterface $translator,
    ){}

    public function getName(mixed $entity, bool $fullForm = false): string
    {
        $class = ClassUtils::getClass($entity);

        return match($class) {
            Area::class => $this->getAreaName($entity, $fullForm),
            District::class => $this->getDistrictName($entity, $fullForm),
            City::class => $this->getCityName($entity, $fullForm),
            CityDistrict::class => $this->getCityDistrictName($entity, $fullForm),
            default => throw new \RuntimeException(sprintf('Unknown entity: %s', $class)),
        };
    }

    private function getAreaName(Area $area, bool $fullForm): string
    {
        $str = $area->getName();

        if ($area->getId() != 1) { // for Crimea todo: set marker to db?
            $str .= ' '.$this->translator->trans(
                sprintf('settlements.%s.area', !$fullForm ? 'short' : 'full')
            );
        }

        return $str;
    }

    private function getDistrictName(District $district, bool $fullForm): string
    {
        return $district->getName().' '.$this->translator->trans(
            sprintf('settlements.%s.district', !$fullForm ? 'short' : 'full')
        );
    }

    private function getCityName(City $city, bool $fullForm): string
    {
        return $this->translator->trans(sprintf(
            'city.types.%s.%s',
            !$fullForm ? 'short' : 'full',
            $city->getType()->value
        )).' '.$city->getName();
    }

    private function getCityDistrictName(CityDistrict $cityDistrict, bool $fullForm): string
    {
        return $cityDistrict->getName().' '.$this->translator->trans(
            sprintf('settlements.%s.district', !$fullForm ? 'short' : 'full')
        );
    }
}

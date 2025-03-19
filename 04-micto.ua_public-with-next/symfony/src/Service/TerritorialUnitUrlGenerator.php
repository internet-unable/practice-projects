<?php

namespace App\Service;

use App\Entity\Area;
use App\Entity\City;
use App\Entity\CityDistrict;
use App\Entity\District;
use App\Repository\AreaRepository;
use App\Repository\CityDistrictRepository;
use App\Repository\CityRepository;
use App\Repository\DistrictRepository;
use Doctrine\Common\Util\ClassUtils;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class TerritorialUnitUrlGenerator
{
    public function __construct(
        private readonly UrlGeneratorInterface $generator,
        private readonly AreaRepository $areaRepo,
        private readonly DistrictRepository $districtRepo,
        private readonly CityRepository $cityRepo,
        private readonly CityDistrictRepository $cityDistrictRepo,
    ){}

    public function getUrl(mixed $entity, bool $isAbsolute = false): string
    {
        $class = ClassUtils::getClass($entity);
        $referenceType = $isAbsolute ? UrlGeneratorInterface::ABSOLUTE_URL : UrlGeneratorInterface::ABSOLUTE_PATH;

        return match($class) {
            Area::class => $this->getAreaUrl($entity, $referenceType),
            District::class => $this->getDistrictUrl($entity, $referenceType),
            City::class => $this->getCityUrl($entity, $referenceType),
            CityDistrict::class => $this->getCityDistrictUrl($entity, $referenceType),
            default => throw new \RuntimeException(sprintf('Unknown entity: %s', $class)),
        };
    }

    private function getAreaUrl(Area $area, int $referenceType): string
    {
        if (empty($area->getOldId())) {
            $area->setOldId($area->getId());

            $this->areaRepo->save($area);
        }

        return $this->generator->generate('tu_page', [
            'id' => $area->getOldId(),
            'slug' => $area->getSlug(),
        ], $referenceType);
    }

    private function getDistrictUrl(District $district, int $referenceType): string
    {
        if (empty($district->getOldId())) {
            $district->setOldId($district->getId() + 31000);

            $this->districtRepo->save($district);
        }

        return $this->generator->generate('tu_page', [
            'id' => $district->getOldId(),
            'slug' => $district->getSlug(),
        ], $referenceType);
    }

    private function getCityUrl(City $city, int $referenceType): string
    {
        if (empty($city->getOldId())) {
            $city->setOldId($city->getId() + 33000);

            $this->cityRepo->save($city);
        }

        return $this->generator->generate('tu_page', [
            'id' => $city->getOldId(),
            'slug' => $city->getSlug(),
        ], $referenceType);
    }

    private function getCityDistrictUrl(CityDistrict $cityDistrict, int $referenceType): string
    {
        if (empty($cityDistrict->getOldId())) {
            $cityDistrict->setOldId($cityDistrict->getId() + 43000);

            $this->cityDistrictRepo->save($cityDistrict);
        }

        return $this->generator->generate('tu_page', [
            'id' => $cityDistrict->getOldId(),
            'slug' => $cityDistrict->getSlug(),
        ], $referenceType);
    }
}

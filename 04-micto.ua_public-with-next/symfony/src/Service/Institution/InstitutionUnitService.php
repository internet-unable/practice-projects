<?php

namespace App\Service\Institution;

use App\Entity\Institution\InstitutionUnit;
use App\Repository\Institution\InstitutionUnitRepository;
use RuntimeException;

class InstitutionUnitService
{
    public function __construct(
        private readonly InstitutionUnitRepository $institutionUnitRepo,
    ){}

    /**
     * @throws RuntimeException
     */
    public function save(InstitutionUnit $institutionUnit): void
    {
        $this->validateCityAndCityDistrictMatch($institutionUnit);

        // $errors = $this->validator->validate($institutionUnit);
        // ValidationFailedException::throwException($errors);

        $this->institutionUnitRepo->save($institutionUnit);
    }

    private function validateCityAndCityDistrictMatch(InstitutionUnit $institutionUnit): void
    {
        if (!$cityDistrict = $institutionUnit->getCityDistrict()) {
            return;
        }

        if ($institutionUnit->getCity()->getId() !== $cityDistrict->getCity()->getId()) {
            throw new InstitutionException('City and city district do not match');
        }
    }
}

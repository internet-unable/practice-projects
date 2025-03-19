<?php

namespace App\GraphQL\InstitutionUnit\Transformer;

use App\Entity\Address;
use App\Entity\City;
use App\Entity\CityDistrict;
use App\Entity\Institution\InstitutionUnit;
use App\Entity\Schedule\InstitutionUnitSchedule;
use App\GraphQL\Common\Helper\ObjectsCloneHelper;
use App\GraphQL\InstitutionUnit\Input\InstitutionUnitInput;
use App\GraphQL\Schedule\Service\ScheduleService;
use App\Repository\CityDistrictRepository;
use App\Repository\CityRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityManagerInterface;
use TheCodingMachine\GraphQLite\Exceptions\GraphQLException;

class InstitutionUnitTransformer
{
    public function __construct(
        private readonly CityRepository $cityRepository,
        private readonly CityDistrictRepository $cityDistrictRepository,
        private readonly EntityManagerInterface $em,
        private readonly ScheduleService $scheduleService,
    ){}

    public function inputToInstitutionUnit(
        InstitutionUnitInput $input,
        ?InstitutionUnit $institutionUnit,
    ): InstitutionUnit
    {
        if (!$institutionUnit) {
            $institutionUnit = new InstitutionUnit();
        }

        ObjectsCloneHelper::setScalarProperties($input, $institutionUnit, [
            'name',
            'fullName',
            'description',
            'edrpou',
        ]);

        if ($input->schedule !== null) {
            $this->updateScheduleFromInput($input->schedule, $institutionUnit);
        }

        $this->setAddressFromInput($input, $institutionUnit);
        $this->setContactsFromInput($input, $institutionUnit);

        return $institutionUnit;
    }

    private function updateScheduleFromInput(array $schedule, InstitutionUnit &$institutionUnit): void
    {
        $result = $this->scheduleService->diffSchedules(
            oldItems: $institutionUnit->getSchedule(),
            newItems: new ArrayCollection($schedule),
            entityClass: InstitutionUnitSchedule::class,
        );

        $institutionUnit->setSchedule($result);
    }

    private function setAddressFromInput(InstitutionUnitInput $input, InstitutionUnit $institutionUnit): void
    {
        if (!$inputAddress = $input->address) {
            return;
        }

        if (!$address = $institutionUnit->getAddress()) {
            $address = new Address();
            $address->setUnit($institutionUnit);
        }

        $address
            ->setAddress($inputAddress->address)
            ->setZipCode($inputAddress->zipCode)
            ->setLatitude($inputAddress->lat)
            ->setLongitude($inputAddress->lon);

        $institutionUnit->setAddress($address);

        $institutionUnit->setCity($this->getCityFromInput($input));
        $institutionUnit->setCityDistrict($this->getCityDistrictFromInput($input));
    }

    private function setContactsFromInput(InstitutionUnitInput $input, InstitutionUnit $institutionUnit): void
    {
        if (!$inputContacts = $input->contacts) {
            return;
        }

        $institutionUnit->setContacts($inputContacts->toArray());
    }

    /**
     * @throws GraphQLException
     */
    private function getCityFromInput(InstitutionUnitInput $input): ?City
    {
        if (!$cityId = $input->address?->cityId) {
            return null;
        }

        if (!$city = $this->cityRepository->findOneById($cityId)) {
            throw new GraphQLException("City with ID: $cityId not found");
        }

        return $city;
    }

    private function getCityDistrictFromInput(InstitutionUnitInput $input): ?CityDistrict
    {
        if (!$cityDistrictId = $input->address?->cityDistrictId) {
            return null;
        }

        if (!$cityDistrict = $this->cityDistrictRepository->findOneById($cityDistrictId)) {
            throw new GraphQLException("City district with ID: $cityDistrictId not found");
        }

        return $cityDistrict;
    }
}

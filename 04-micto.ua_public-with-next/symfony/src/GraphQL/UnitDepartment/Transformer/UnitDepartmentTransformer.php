<?php

namespace App\GraphQL\UnitDepartment\Transformer;

use App\Entity\Institution\InstitutionUnitDepartment;
use App\Entity\Schedule\UnitDepartmentSchedule;
use App\GraphQL\Common\Helper\ObjectsCloneHelper;
use App\GraphQL\Contacts\Transformer\ContactsTransformer;
use App\GraphQL\Schedule\Service\ScheduleService;
use App\GraphQL\UnitDepartment\Input\UnitDepartmentInput;
use Doctrine\Common\Collections\ArrayCollection;

class UnitDepartmentTransformer
{
    public function __construct(
        private readonly ScheduleService $scheduleService,
        private readonly ContactsTransformer $contactsTransformer,
    ){}

    public function inputToUnitDepartment(
        UnitDepartmentInput $input,
        ?InstitutionUnitDepartment $unitDepartment,
    ): InstitutionUnitDepartment
    {
        if (!$unitDepartment) {
            $unitDepartment = new InstitutionUnitDepartment();
        }

        ObjectsCloneHelper::setScalarProperties($input, $unitDepartment, [
            'name',
            'fullName',
            'description',
            'number',
        ]);

        if ($input->schedule !== null) {
            $this->updateScheduleFromInput($input->schedule, $unitDepartment);
        }

        $this->setContactsFromInput($input, $unitDepartment);

        return $unitDepartment;
    }

    private function updateScheduleFromInput(array $schedule, InstitutionUnitDepartment $unitDepartment): void
    {
        $result = $this->scheduleService->diffSchedules(
            oldItems: $unitDepartment->getSchedule(),
            newItems: new ArrayCollection($schedule),
            entityClass: UnitDepartmentSchedule::class,
        );

        $unitDepartment->setSchedule($result);
    }

    private function setContactsFromInput(UnitDepartmentInput $input, InstitutionUnitDepartment $unitDepartment): void
    {
        if (!$inputContacts = $input->contacts) {
            return;
        }

        $unitDepartment->setContacts($inputContacts->toArray());
    }
}

<?php

namespace App\GraphQL\Schedule\Transformer;

use App\Entity\Schedule\Schedule;
use App\GraphQL\Common\Helper\ObjectsCloneHelper;
use App\GraphQL\Schedule\Input\ScheduleItemInputType;

class ScheduleTransformer
{
    public function fromInput(
        ?ScheduleItemInputType $input,
        string $entityClass
    ): ?Schedule
    {
        if (!$input) {
            return null;
        }

        $schedule = (new $entityClass());

        if (!$schedule instanceof Schedule) {
            throw new \RuntimeException('Incorrect schedule class name '.$entityClass);
        }

        $schedule->setDayOfWeek($input->dayOfWeek);

        ObjectsCloneHelper::setScalarProperties($input, $schedule, [
            'isHoliday',
            'isAroundTheClock',
        ]);

        if ($input->startTime) {
            $schedule->setStartTime($input->startTime);
        }

        if ($input->endTime) {
            $schedule->setEndTime($input->endTime);
        }

        return $schedule;
    }
}

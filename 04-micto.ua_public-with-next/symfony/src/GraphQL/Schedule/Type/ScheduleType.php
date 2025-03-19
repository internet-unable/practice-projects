<?php

namespace App\GraphQL\Schedule\Type;

use App\Entity\Schedule\Schedule;
use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\SourceField;
use TheCodingMachine\GraphQLite\Annotations\Type;

#[Type(class: Schedule::class, name: 'Schedule')]
#[SourceField(name: 'id')]
#[SourceField(name: 'dayOfWeek')]
#[SourceField(name: 'isHoliday')]
#[SourceField(name: 'isAroundTheClock')]
class ScheduleType
{
    #[Field(name: 'startTime')]
    public function getStartTime(Schedule $schedule): ?string
    {
        return $schedule->getStartTime()?->format('H:i');
    }

    #[Field(name: 'endTime')]
    public function getEndTime(Schedule $schedule): ?string
    {
        return $schedule->getEndTime()?->format('H:i');
    }
}

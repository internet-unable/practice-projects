<?php

namespace App\GraphQL\Schedule\Input;

use App\Entity\Schedule\DayOfWeek;
use DateTimeInterface;
use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\Input;

#[Input(name: 'ScheduleItemInput', description: 'Input type for schedule')]
class ScheduleItemInputType
{
    #[Field]
    public DayOfWeek $dayOfWeek;

    #[Field]
    public ?bool $isHoliday = null;

    #[Field]
    public ?bool $isAroundTheClock = null;

    #[Field]
    public ?DateTimeInterface $startTime = null;

    #[Field]
    public ?DateTimeInterface $endTime = null;
}

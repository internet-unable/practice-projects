<?php

namespace App\Entity\Schedule;

use App\Entity\AbstractEntity;
use DateTimeInterface;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table('schedules')]
#[ORM\InheritanceType('SINGLE_TABLE')]
#[ORM\DiscriminatorColumn('entity_type', type: 'string')]
#[ORM\DiscriminatorMap([
    // Keep in sync with the DB schedules.entity_type ENUM
    'InstitutionUnit' => InstitutionUnitSchedule::class,
    'UnitDepartment' => UnitDepartmentSchedule::class
])]
#[ORM\UniqueConstraint(columns: ['entity_type', 'entity_id', 'day_of_week'])]
abstract class Schedule extends AbstractEntity
{
    #[ORM\Column(type: 'string', enumType: DayOfWeek::class)]
    private DayOfWeek $dayOfWeek;

    #[ORM\Column(type: 'time_immutable', nullable: true)]
    private ?DateTimeInterface $startTime = null;

    #[ORM\Column(type: 'time_immutable', nullable: true)]
    private ?DateTimeInterface $endTime = null;

    #[ORM\Column(type: 'boolean', options: ['default' => false])]
    private bool $isHoliday = false;

    #[ORM\Column(type: 'boolean', options: ['default' => false])]
    private bool $isAroundTheClock = false;

    public function getDayOfWeek(): DayOfWeek
    {
        return $this->dayOfWeek;
    }

    public function setDayOfWeek(DayOfWeek $dayOfWeek): self
    {
        $this->dayOfWeek = $dayOfWeek;

        return $this;
    }

    public function getStartTime(): ?DateTimeInterface
    {
        return $this->startTime;
    }

    public function setStartTime(?DateTimeInterface $startTime): self
    {
        $this->startTime = $startTime;

        return $this;
    }

    public function getEndTime(): ?DateTimeInterface
    {
        return $this->endTime;
    }

    public function setEndTime(?DateTimeInterface $endTime): self
    {
        $this->endTime = $endTime;

        return $this;
    }

    public function isHoliday(): bool
    {
        return $this->isHoliday;
    }

    public function setIsHoliday(bool $isHoliday): self
    {
        $this->isHoliday = $isHoliday;

        return $this;
    }

    public function isAroundTheClock(): bool
    {
        return $this->isAroundTheClock;
    }

    public function setIsAroundTheClock(bool $isAroundTheClock): self
    {
        $this->isAroundTheClock = $isAroundTheClock;

        return $this;
    }
}

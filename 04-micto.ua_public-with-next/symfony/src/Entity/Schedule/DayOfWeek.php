<?php

namespace App\Entity\Schedule;

use Symfony\Contracts\Translation\TranslatorInterface;

enum DayOfWeek: string {
    case MON = 'Mon';
    case TUE = 'Tue';
    case WED = 'Wed';
    case THU = 'Thu';
    case FRI = 'Fri';
    case SAT = 'Sat';
    case SUN = 'Sun';

    public function trans(TranslatorInterface $translator, string $locale = null): string
    {
        return $translator->trans(
            'schedule.day_of_week.'.$this->name,
            locale: $locale
        );
    }
}

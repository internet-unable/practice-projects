<?php

namespace App\Controller\Admin\Form;

use App\Entity\Schedule\UnitDepartmentSchedule;
use Symfony\Component\OptionsResolver\OptionsResolver;

class UnitDepartmentScheduleType extends UnitScheduleType
{
    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => UnitDepartmentSchedule::class,
        ]);
    }
}


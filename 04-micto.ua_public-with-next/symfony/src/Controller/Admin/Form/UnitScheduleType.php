<?php

namespace App\Controller\Admin\Form;

use App\Entity\Schedule\DayOfWeek;
use App\Entity\Schedule\InstitutionUnitSchedule;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\TimeType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class UnitScheduleType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('dayOfWeek', ChoiceType::class, [
                'label' => 'schedule.day_of_week',
                'required' => true,
                'multiple' => false,
                'choices' => DayOfWeek::cases(),
                'choice_label' => fn(DayOfWeek $choice) => sprintf('day_of_week.%s', strtolower($choice->name)),
                'choice_value' => fn(?DayOfWeek $choice) => $choice?->value,
            ])
            ->add('startTime', TimeType::class, [
                'label' => 'schedule.start_time',
                'with_minutes' => true,
                'input' => 'datetime_immutable'
            ])
            ->add('endTime', TimeType::class, [
                'label' => 'schedule.end_time',
                'with_minutes' => true,
                'input' => 'datetime_immutable'
            ])
            ->add('isHoliday', CheckboxType::class, [
                'label' => 'schedule.holiday',
            ])
            ->add('isAroundTheClock', CheckboxType::class, [
                'label' => 'schedule.around_the_clock',
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => InstitutionUnitSchedule::class,
        ]);
    }
}


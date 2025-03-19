<?php

namespace App\Form\Comment;

use App\Entity\Comment;
use App\Entity\Institution\Institution;
use App\Entity\Institution\InstitutionUnit;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\Form\FormInterface;

trait CommentFormUniTrait
{
    protected function preSubmit(FormBuilderInterface $builder)
    {
        $builder->addEventListener(
            FormEvents::PRE_SUBMIT,
            function (FormEvent $event) {
                $data = $event->getData();

                try {
                    $entity = $this->commentTypeService->getEntity(
                        $data['entityType'] ?? '',
                        $data['entityId'] ?? 0,
                    );

                    $this->addUnitField($event->getForm(), $entity);
                } catch (\Exception) { }
            }
        );
    }

    protected function preSetData(FormBuilderInterface $builder)
    {
        $builder->addEventListener(
            FormEvents::PRE_SET_DATA,
            function (FormEvent $event) {
                /** @var Comment $data */
                $data = $event->getData();
                $entity = $data->getEntity();

                $this->addUnitField($event->getForm(), $entity);
            }
        );
    }

    protected function addUnitField(FormInterface $form, mixed $entity)
    {
        if (!$entity instanceof Institution) {
            return;
        }

        $units = ['Оберіть підрозділ' => ''];

        /** @var InstitutionUnit $unit */
        foreach ($entity->getUnits() as $unit) {
            $units[$unit->getName()] = $unit->getId();

        }

        $form->add('unit', ChoiceType::class, [
            'row_attr' => ['id' => 'institution_unit'],
            'label' => 'Оберіть підрозділ',
            'required' => false,
            'multiple' => false,
            'mapped' => false,
            'choices' => $units,
        ]);
    }
}

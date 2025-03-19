<?php

namespace SoftUa\UserBundle\Admin\Roles;

use Doctrine\ORM\PersistentCollection;
use SoftUa\UserBundle\Entity\Permission;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\OptionsResolver\OptionsResolver;

class PermissionsFormType extends AbstractType
{
    private array $permissionChoices = [];

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $this->permissionChoices = $options['permissions'] ?? [];

        $builder->addEventListener(FormEvents::PRE_SET_DATA, function (FormEvent $event): void {
            $this->onPreSetData($event);
        });
    }

    private function onPreSetData(FormEvent $event)
    {
        $form = $event->getForm();
        $checked = $this->getPermissionsFromCollection($event->getData());

        $i = 1;
        foreach ($this->permissionChoices as $groupName => $permissions) {
           $form->add('permissions_group_'.$i++, ChoiceType::class, [
               'label' => $groupName,
               'choices' => $permissions,
               'expanded' => true,
               'multiple' => true,
               'data' => $checked,
           ]);
        }
    }

    private function getPermissionsFromCollection(PersistentCollection $permissions): array
    {
        $items = [];

        /** @var Permission[] $permissionsArray */
        $permissionsArray = $permissions->toArray();

        foreach ($permissionsArray as $permission) {
            $items[] = $permission->getId();
        }

        return $items;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setRequired('permissions');
    }
}

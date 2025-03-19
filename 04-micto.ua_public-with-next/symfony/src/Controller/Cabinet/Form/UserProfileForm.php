<?php

namespace App\Controller\Cabinet\Form;

use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\FormBuilderInterface;

class UserProfileForm extends AbstractType
{
    public function __construct(
        private readonly Security $security,
    ){}

    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('user', UserType::class, ['label'=>false])
            ->add('submit', SubmitType::class, [
                'label' => 'Зберегти',
            ]);

        if ($this->security->isGranted('ROLE_DOCTOR')) {
            $builder->add('doctorProfile', DoctorProfileType::class, ['label'=>false]);
        }
    }
}

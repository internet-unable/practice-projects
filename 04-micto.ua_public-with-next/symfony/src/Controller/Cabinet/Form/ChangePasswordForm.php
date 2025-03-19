<?php

namespace App\Controller\Cabinet\Form;

use SoftUa\UserBundle\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

class ChangePasswordForm extends AbstractType
{
    public function __construct(){}

    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('plain_password', RepeatedType::class, [
                'type' => PasswordType::class,
                'required' => true,
                'first_options' => [
                    'label' => 'auth.register.user.password',
                    'row_attr' => ['class' => 'input-row'],
                    'constraints' => [
                        new NotBlank()
                    ],
                    'attr' => [
                        'class' => 'password first',
                    ],
                ],
                'second_options' => [
                    'label' => 'auth.register.user.repeat_password',
                    'row_attr' => ['class' => 'input-row'],
                    'constraints' => [
                        new NotBlank()
                    ],
                    'attr' => [
                        'class' => 'password second',
                    ],
                ],
                'mapped' => false,
                'invalid_message' => 'register.repeat_password_mast_match',
            ])
            ->add('submit', SubmitType::class, ['label' => 'auth.reset_pass']);
    }
}

<?php

namespace App\Form\InstituitionRegister;

use SoftUa\UserBundle\Entity\User;
use App\Entity\Institution\OwnershipForm;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\Regex;
use Symfony\Component\Validator\Constraints\NotBlank;

class Step1Type extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('fullName', TextareaType::class, [
                'label' => 'Повна назва',
                'required' => true,
                'attr' => [
                    'rows' => 6,
                    'placeholder' => 'Вкажіть повну назву вашого медзакладу',
                ],
                'constraints' => [
                    new NotBlank(),
                    new Length(
                        min: 2,
                        max: 255,
                        minMessage: 'Значення занадто коротке. Введіть більше {{ limit }} символів',
                        maxMessage: 'Значення занадто довге. Введіть менше {{ limit }} символів',
                    ),
                ],
            ])
            ->add('ownershipForm', ChoiceType::class, [
                'label' => 'Тип власності',
                'row_attr' => ['id' => 'ownership_form_block'],
                'required' => true,
                'constraints' => [
                    new NotBlank(['message' => 'Оберіть один з типів']),
                ],
                'choices' => [
                    'Не вибрано' => null,
                    'Державна' => OwnershipForm::STATE,
                    'Приватна' => OwnershipForm::PRIVATE,
                    'Комунальна' => OwnershipForm::COLLECTIVE,
                ],
            ])
            ->add('edrpou', TextType::class, [
                'required' => true,
                'label' => 'Код ЄДРПОУ',
                'attr' => [
                    'placeholder' => 'Вкажіть код медзакладу',
                    'maxlength' => 8,
                ],
                'constraints' => [
                    new NotBlank(['message' => 'Вкажіть код медзакладу']),
                    new Length(
                        min: 8,
                        max: 8,
                        exactMessage: 'Значення повинно бути рівно 8 символів',
                    ),
                    new Regex(['pattern' => '/^\d{8}$/', 'message' => 'Код має містити тільки цифри'])
                ],
            ])
            ->add('about', TextAreaType::class, [
                'label' => 'Про медзаклад',
                'required' => false,
            ])
            ->add('submit', SubmitType::class, [
                'label' => 'Продовжити',
                'attr' => [
                    'class' => 'button primary'
                ]
            ]);
    }

    // public function configureOptions(OptionsResolver $resolver)
    // {
    //     $resolver->setDefaults([
    //         'data_class' => User::class,
    //     ]);
    // }
}

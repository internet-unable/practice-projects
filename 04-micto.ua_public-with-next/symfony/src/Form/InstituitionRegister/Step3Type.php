<?php

namespace App\Form\InstituitionRegister;

use SoftUa\UserBundle\Entity\User;
use App\Entity\Institution\OwnershipForm;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Validator\Constraints\IsTrue;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;

class Step3Type extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('plain_password', RepeatedType::class, [
                'type' => PasswordType::class,
                'required' => true,
                'first_options' => [
                    'label' => 'auth.register.user.password',
                    'row_attr' => ['class' => 'input-row'],
                    'constraints' => [
                        new NotBlank(),
                        new Length(
                            min: 6,
                            max: 32,
                            minMessage: 'Значення занадто коротке. Введіть {{ limit }} або більше символів',
                            maxMessage: 'Значення занадто довге. Введіть менше {{ limit }} символів',
                        ),
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
            ->add('agreeTerms', CheckboxType::class, [
                'label' => 'Так, Я погоджуюсь на обробку персональної інформації та з Політикою конфіденційності',
                'required' => true,
                'row_attr' => [
                    'class' => 'checkbox-wrapper'
                ],
                'constraints' => [
                    new IsTrue([
                        'message' => 'register.agree_terms_are_require',
                    ]),
                ],
            ])
            ->add('submit', SubmitType::class, [
                'label' => 'Продовжити',
                'attr' => [
                    'class' => 'button primary'
                ]
            ]);
    }
}

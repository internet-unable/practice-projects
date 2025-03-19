<?php

namespace App\Form;

use EWZ\Bundle\RecaptchaBundle\Form\Type\EWZRecaptchaType;
use EWZ\Bundle\RecaptchaBundle\Validator\Constraints\IsTrue as RecaptchaTrue;
use Misd\PhoneNumberBundle\Validator\Constraints\PhoneNumber;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TelType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;

class InvestorRequestFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        // TODO: Перенести текст в translations
        $builder
            ->add('name', TextType::class, [
                'label' => 'Ім`я',
                'constraints' => [
                    new NotBlank(),
                    new Length(
                        min: 2,
                        max: 255,
                        minMessage: 'Значення занадто коротке. Введіть більше {{ limit }} символів',
                        maxMessage: 'Значення занадто довге. Введіть менше {{ limit }} символів',
                    ),
                ],
                'required' => true,
                'attr' => [
                    'minlength' => '2',
                    'maxlength' => '255',
                    'placeholder' => 'Вкажіть ваше ім’я',
                ],
            ])
            ->add('phone', TelType::class, [
                'label' => 'common.label.phone',
                'required' => true,
                'constraints' => [
                    new NotBlank(),
                    new PhoneNumber(type: ['fixed_line', 'mobile'])
                ],
                'attr' => [
                    'placeholder' => 'Вкажіть ваш номер телефону',
                ],
            ])
            ->add('email', EmailType::class, [
                'label' => 'E-mail',
                'required' => false,
                'constraints' => [
                    new NotBlank(),
                    new Email(mode: Email::VALIDATION_MODE_STRICT),
                ],
                'attr' => [
                    'placeholder' => 'Введіть вашу пошту',
                ],
            ])
            ->add('comment', TextareaType::class, [
                'label' => 'Повідомлення',
                'required' => false,
                'attr' => [
                    'rows' => 2,
                    'placeholder' => 'Тут Ви можете залишити коментар до заявки',
                ],
            ])
            ->add('recaptcha', EWZRecaptchaType::class, [
                'row_attr' => ['class' => 'recaptcha'],
                'attr' => [
                    'data-callback' => 'onReCaptchaSuccess',
                    'options' => [
                        'theme' => 'light',
                        'size'  => 'normal',
                        'type' => 'image',
                        'defer' => true,
                        'async' => true,
                    ]
                ],
                'mapped' => false,
                'label' => false,
                'constraints' => [new RecaptchaTrue()],
            ])

            ->add('submit', SubmitType::class, [
                'attr' => [
                    'class' => 'primary button'
                ],
                'label' => 'common.submit'
            ]);
    }
}

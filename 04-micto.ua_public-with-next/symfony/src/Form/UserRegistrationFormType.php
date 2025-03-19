<?php

namespace App\Form;

use SoftUa\UserBundle\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\BirthdayType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use EWZ\Bundle\RecaptchaBundle\Form\Type\EWZRecaptchaType;
use EWZ\Bundle\RecaptchaBundle\Validator\Constraints\IsTrue as RecaptchaTrue;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\IsTrue;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Contracts\Translation\TranslatorInterface;

class UserRegistrationFormType extends AbstractType
{
    public function __construct(
        private readonly TranslatorInterface $translator
    ){}

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('firstName', TextType::class, [
                'label' => 'auth.register.user.first_name',
                'attr' => [
                    'placeholder' => 'auth.register.user.name_placeholder',
                ]
            ])
            ->add('lastName', TextType::class, [
                'label' => 'auth.register.user.last_name',
                'attr' => [
                    'placeholder' => 'auth.register.user.last_name_placeholder',
                ]
            ])
            // ->add('dateOfBirth', BirthdayType::class, [
            //     'label' => 'auth.register.user.date_of_birth',
            //     'widget' => 'choice',
            //     'placeholder' => [
            //         'year' => 'auth.register.user.year', 'month' => 'auth.register.user.month', 'day' => 'auth.register.user.day',
            //     ],
            //     'required' => false,
            //     'years' => array_reverse(
            //         range((int) date('Y') - 110, (int) date('Y'))
            //     ),
            // ])
            ->add('email', EmailType::class, [
                'label' => 'common.label.email',
                'required' => true,
                'constraints' => [new Email()],
                'attr' => [
                    'placeholder' => 'auth.register.user.last_name_placeholder',
                ],
                'help' => 'Цей e-mail буде використовуватись для зворотнього зв’язку та авторизації.'
            ])
            ->add('password', RepeatedType::class, [
                'type' => PasswordType::class,
                'required' => true,
                'first_options' => [
                    'label' => 'auth.register.user.password',
                    'attr' => [
                        'class' => 'password first',
                        'placeholder' => 'auth.register.user.password_placeholder'
                    ],
                    'constraints' => [
                        new NotBlank(),
                        new Length(
                            min: 6,
                            max: 32,
                            minMessage: 'Значення занадто коротке. Введіть {{ limit }} або більше символів',
                            maxMessage: 'Значення занадто довге. Введіть менше {{ limit }} символів',
                        ),
                    ],
                ],
                'second_options' => [
                    'label' => 'auth.register.user.repeat_password',
                    'attr' => [
                        'class' => 'password second',
                        'placeholder' => 'auth.register.user.repeat_password_placeholder'
                    ],
                ],
                'invalid_message' => 'register.repeat_password_mast_match',
            ])
            ->add('agreeTerms', CheckboxType::class, [
                'mapped' => false,
                'label' => 'auth.register.user.agree_terms',
                'required' => true,
                'constraints' => [
                    new IsTrue([
                        'message' => 'register.agree_terms_are_require',
                    ]),
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
                    ],
                ],
                'mapped' => false,
                'label' => false,
                'constraints' => [new RecaptchaTrue()],
            ])
            ->add('submit', SubmitType::class, [
                'label' => 'auth.register.user.submit_btn'
            ]);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}

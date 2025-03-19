<?php

namespace App\Form;

use Misd\PhoneNumberBundle\Validator\Constraints\PhoneNumber;
use SoftUa\UserBundle\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TelType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\IsTrue;
use Symfony\Component\Validator\Constraints\NotBlank;

class InstitutionRegistrationFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('email', EmailType::class, [
                'label' => 'common.label.email',
                'required' => true,
                'constraints' => [
                    new Email(mode: Email::VALIDATION_MODE_STRICT),
                ],
                'help' => 'auth.register.help.email',
            ])
            ->add('password', RepeatedType::class, [
                'type' => PasswordType::class,
                'required' => true,
                'first_options' => [
                    'label' => 'auth.register.user.password',
                    'attr' => [
                        'class' => 'password first',
                    ],
                ],
                'second_options' => [
                    'label' => 'auth.register.user.repeat_password',
                    'attr' => [
                        'class' => 'password second',
                    ],
                ],
                'invalid_message' => 'register.repeat_password_mast_match',
            ])
            ->add('phone', TelType::class, [
                'label' => 'common.label.phone',
                'required' => true,
                'constraints' => [
                    new NotBlank(),
                    new PhoneNumber(type: ['fixed_line', 'mobile'])
                ],
                'help' => 'auth.register.help.phone',
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

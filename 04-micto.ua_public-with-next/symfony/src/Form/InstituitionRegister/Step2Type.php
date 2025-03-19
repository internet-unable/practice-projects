<?php

namespace App\Form\InstituitionRegister;

use SoftUa\UserBundle\Entity\User;
use App\Entity\Institution\OwnershipForm;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TelType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\IsTrue;
use Symfony\Component\Validator\Constraints\NotBlank;
use Misd\PhoneNumberBundle\Validator\Constraints\PhoneNumber;
use App\Validator\Constraints\UniqueUserEmail;

class Step2Type extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('firstName', TextType::class, [
                'label' => 'auth.register.user.first_name',
                'attr' => [
                    'placeholder' => 'auth.register.institution.name_placeholder',
                ],
                'constraints' => [
                    new NotBlank(),
                ],
            ])
            ->add('lastName', TextType::class, [
                'label' => 'auth.register.user.last_name',
                'attr' => [
                    'placeholder' => 'auth.register.institution.last_name_placeholder',
                ],
                'constraints' => [
                    new NotBlank(),
                ],
            ])
            ->add('phone', TelType::class, [
                'label' => 'auth.register.institution.work_phone',
                'required' => true,
                'constraints' => [
                    new NotBlank(),
                    new PhoneNumber(type: ['fixed_line', 'mobile'])
                ],
                'attr' => [
                    'placeholder' => 'auth.register.institution.phone_placeholder',
                ],
            ])
            ->add('email', EmailType::class, [
                'label' => 'common.label.email',
                'required' => true,
                'constraints' => [
                    new Email(mode: Email::VALIDATION_MODE_STRICT),
                    new NotBlank(),
                    new UniqueUserEmail('common.email_is_in_use'),
                ],
                'attr' => [
                    'placeholder' => 'comment.form.email.placeholder',
                ],
                'help' => 'Цей e-mail буде використовуватись для зворотнього зв’язку та авторизації.'
            ])
            ->add('position', TextType::class, [
                'required' => false,
                'label' => 'auth.register.institution.position',
                'attr' => [
                    'placeholder' => 'auth.register.institution.position_placeholder',
                ],
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

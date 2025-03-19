<?php

namespace App\Form;

use EWZ\Bundle\RecaptchaBundle\Form\Type\EWZRecaptchaType;
use EWZ\Bundle\RecaptchaBundle\Validator\Constraints\IsTrue as RecaptchaTrue;
use Symfony\Component\Form\AbstractType;
use Misd\PhoneNumberBundle\Validator\Constraints\PhoneNumber;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TelType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;

class PsychologistRequestFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        // TODO: Перенести текст в translations
        $builder
            ->add('name', TextType::class, [
                'label' => 'psychologist.form.name.label',
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
                    'placeholder' => 'psychologist.form.name.placeholder',
                ],
            ])
            ->add('phone', TelType::class, [
                'label' => 'psychologist.form.phone.label',
                'required' => true,
                'constraints' => [
                    new NotBlank(),
                    new PhoneNumber(type: ['fixed_line', 'mobile'])
                ],
                'attr' => [
                    'placeholder' => 'psychologist.form.phone.placeholder',
                ],
            ])
            ->add('comment', TextareaType::class, [
                'label' => 'psychologist.form.comment.label',
                'required' => true,
                'constraints' => [
                    new NotBlank(),
                ],
                'attr' => [
                    'rows' => 6,
                    'placeholder' => 'psychologist.form.comment.placeholder',
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
                'label' => 'psychologist.form.submit'
            ]);
    }
}

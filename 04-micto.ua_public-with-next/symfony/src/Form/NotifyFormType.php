<?php

namespace App\Form;

use EWZ\Bundle\RecaptchaBundle\Form\Type\EWZRecaptchaType;
use EWZ\Bundle\RecaptchaBundle\Validator\Constraints\IsTrue as RecaptchaTrue;
use Symfony\Component\Form\AbstractType;
use Misd\PhoneNumberBundle\Validator\Constraints\PhoneNumber;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TelType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\Choice;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;

class NotifyFormType extends AbstractType
{
    const ENTITY_TYPE_INSTITUTION = 'institution';
    const ENTITY_TYPE_UNIT = 'unit';
    const ENTITY_TYPE_DEPARTMENT = 'department';

    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('entityId', HiddenType::class, [
                'required' => true,
                'constraints' => [
                    new NotBlank(),
                ],
            ])
            ->add('entityType', HiddenType::class, [
                'required' => true,
                'constraints' => [
                    new NotBlank(),
                    new Choice(
                        choices: [self::ENTITY_TYPE_INSTITUTION, self::ENTITY_TYPE_UNIT, self::ENTITY_TYPE_DEPARTMENT],
                        message: 'Дані передано некоректно'
                    ),
                ],
            ])
            ->add('comment', TextareaType::class, [
                'label' => 'notify.form.comment.label',
                'required' => true,
                'constraints' => [
                    new NotBlank(),
                ],
                'attr' => [
                    'rows' => 6,
                    'placeholder' => 'notify.form.comment.placeholder',
                ],
            ])
            ->add('name', TextType::class, [
                'label' => 'notify.form.name.label',
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
                    'placeholder' => 'notify.form.name.placeholder',
                ],
            ])
            ->add('email', EmailType::class, [
                'label' => 'notify.form.email.label',
                'required' => true,
                'constraints' => [
                    new NotBlank(),
                    new Email(mode: Email::VALIDATION_MODE_STRICT)
                ],
                'attr' => [
                    'placeholder' => 'notify.form.email.placeholder',
                ],
            ])
            ->add('phone', TelType::class, [
                'label' => 'notify.form.phone.label',
                'required' => false,
                'attr' => [
                    'placeholder' => 'notify.form.phone.placeholder',
                ],
            ])
            ->add('institutionAgent', CheckboxType::class, [
                'label' => 'Я представник цього закладу',
                'required' => false,
                'help' => 'Ми з Вами зв’яжемося для уточнення інформації',
                'row_attr' => ['class' => 'checkbox-wrapper'],
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
                'row_attr' => ['class' => 'submit-row'],
                'label' => 'common.submit'
            ]);
    }
}

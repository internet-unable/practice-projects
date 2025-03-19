<?php

namespace App\Form;

use App\Entity\Institution\OwnershipForm;
use EWZ\Bundle\RecaptchaBundle\Form\Type\EWZRecaptchaType;
use EWZ\Bundle\RecaptchaBundle\Validator\Constraints\IsTrue as RecaptchaTrue;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\IsTrue;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;

class CreateInstitutionRequestFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        // TODO: Перенести текст в translations
        $builder
            ->add('userType', ChoiceType::class, [
                'label' => 'Давайте познайомимось',
                'row_attr' => ['id' => 'user_type_block'],
                'expanded' => true,
                'required' => true,
                'constraints' => [
                    new NotBlank(),
                ],
                'choices' => [
                    'Я відвідувач закладу' => 'visitor',
                    'Я представник закладу' => 'institution',
                ],
                'choice_attr' => function($choice, $key, $value) {
                    return ['data-user-type' => $choice];
                },
                'data' => 'visitor'
            ])
            ->add('contacts', TextareaType::class, [
                'label' => 'Вкажіть, будь ласка, контактну пошту, ім’я та посаду. Якщо ви представник цілої мережі закладів - напишіть нам на пошту infos@micto.ua',
                'required' => false,
                'attr' => [
                    'rows' => 2,
                ],
            ])
            ->add('agreeTerms', CheckboxType::class, [
                'label' => 'Так, Я погоджуюсь на обробку персональної інформації та з Політикою конфіденційності',
                'required' => false,
            ])
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
            ->add('shortName', TextType::class, [
                'label' => 'Коротка назва',
                'required' => false,
                'attr' => [
                    'minlength' => '2',
                    'maxlength' => '255',
                    'placeholder' => 'Вкажіть коротку назву вашого медзакладу',
                ]
            ])
            ->add('institutionType', TextType::class, [
                'required' => true,
                'constraints' => [
                    new NotBlank()
                ],
                'label' => 'Тип закладу',
                'attr' => [
                    'placeholder' => 'Вкажіть тип закладу',
                ],
                'help' => 'Наприклад: Дитяча лікаря, Діагностичний центр, Пологовий будинок…'
            ])
            ->add('ownershipForm', ChoiceType::class, [
                'label' => 'Форма власності',
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
            ->add('address', TextareaType::class, [
                'label' => 'Адреса',
                'required' => true,
                'constraints' => [
                    new NotBlank(),
                ],
                'help' => 'Наприклад: 04107, вул. Татарська 38, м. Київ, Київська обл',
                'attr' => [
                    'rows' => 2,
                    'placeholder' => 'Вкажіть адресу медзакладу',
                ],
            ])
            ->add('chiefFullName', TextType::class, [
                'required' => false,
                'label' => 'ПІБ керівника лікарні',
                'attr' => [
                    'placeholder' => 'Вкажіть ініціали у розгорнутій формі'
                ],
            ])
            ->add('headDoctorFullName', TextType::class, [
                'required' => false,
                'label' => 'ПІБ головного лікаря',
                'attr' => [
                    'placeholder' => 'Вкажіть ініціали у розгорнутій формі',
                ],
            ])
            ->add('phones', TextareaType::class, [
                'label' => 'Номери телефонів',
                'required' => true,
                'constraints' => [new NotBlank(['message' => 'Вкажіть контактні дані медзакладу']),],
                'help' => 'Вкажіть номери телефонів у такому форматі: <span>+380 95 000 11 22 (Реєстратура)</span>, <span>+380 96 001 11 22 (Приймальня)</span>',
                'help_html' => true,
                'attr' => [
                    'rows' => 2,
                    'placeholder' => 'Вкажіть номери телефону медзакладу',
                ],
            ])
            ->add('email', EmailType::class, [
                'label' => 'E-mail',
                'required' => false,
                'help' => 'Цю пошту будуть бачити пацієнти для надсилання звернень',
                'constraints' => [
                    new Email(mode: Email::VALIDATION_MODE_STRICT),
                ],
                'attr' => [
                    'placeholder' => 'Вкажіть електронну пошту медзакладу',
                ],
            ])
            ->add('schedule', TextareaType::class, [
                'label' => 'Графік роботи',
                'required' => false,
                'help' => 'Вкажіть графік роботи медзакладу у такому форматі: Пн-Пт з 09:00 до 18:00, Нд - вихідний',
                'attr' => [
                    'rows' => 2,
                    'placeholder' => 'Вкажіть ваш графік роботи',
                ],
            ])
            ->add('edrpou', TextType::class, [
                'required' => false,
                'label' => 'Код ЄДРПОУ',
                'attr' => [
                    'placeholder' => 'Вкажіть код медзакладу',
                ],
            ])
            ->add('institutionStatus', ChoiceType::class, [
                'label' => 'Актуальний стан лікарні (опціонально)',
                'expanded' => true,
                'required' => false,
                'choices' => [
                    'Функціонує штатно' => '',
                    'На окупованій території' => 'occupied',
                    'Медзаклад релокований' => 'relocated',
                    'Зазнав обстрілів' => 'attacked',
                ],
                'row_attr' => ['id' => 'institution_status_block'],
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
                'label' => 'Надіслати',
                'attr' => [
                    'class' => 'primary button'
                ]
            ]);

        $this->addCustomValidation($builder);
    }

    private function addCustomValidation(FormBuilderInterface $builder)
    {
        $builder->addEventListener(
            FormEvents::PRE_SUBMIT,
            function (FormEvent $event) {
                $data = $event->getData();
                $form = $event->getForm();

                if (isset($data['userType']) && $data['userType'] === 'institution') {
                    $form->add('contacts', TextareaType::class, [
                        'label' => 'Вкажіть, будь ласка, контактну пошту, ім\'я та посаду.',
                        'required' => false,
                        'attr' => [
                            'rows' => 2,
                        ],
                        'constraints' => [
                            new NotBlank(['message' => 'Вкажіть ваші контактні дані']),
                        ],
                    ]);
                    $form->add('agreeTerms', CheckboxType::class, [
                        'label' => 'Так, Я погоджуюсь на обробку персональної інформації та з Політикою конфіденційності',
                        'required' => false,
                        'constraints' => [
                            new IsTrue([
                                'message' => 'Необхідно надати дозвіл на обробку персональної інформації.',
                            ]),
                        ],
                    ]);
                }
            }
        );
    }
}

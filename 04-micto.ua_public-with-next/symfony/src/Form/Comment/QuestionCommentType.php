<?php

namespace App\Form\Comment;

use App\Entity\Comment;
use App\Service\Comment\CommentTypeService;
use EWZ\Bundle\RecaptchaBundle\Form\Type\EWZRecaptchaType;
use EWZ\Bundle\RecaptchaBundle\Validator\Constraints\IsTrue as RecaptchaTrue;
use Misd\PhoneNumberBundle\Validator\Constraints\PhoneNumber;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TelType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;

class QuestionCommentType extends AbstractType
{
    use CommentFormUniTrait;

    public function __construct(
        private readonly CommentTypeService $commentTypeService,
    ) {}

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('entityType', HiddenType::class, [
                'mapped' => false,
            ])
            ->add('entityId', HiddenType::class, [
                'mapped' => false,
            ])
            ->add('text', TextareaType::class, [
                'label' => 'comment.form.text.label',
                'required' => true,
                'constraints' => [
                    new NotBlank(),
                ],
                'row_attr' => ['id' => 'question_text_block'],
                'attr' => [
                    'placeholder' => 'comment.form.text.placeholder'
                ]
            ])
            ->add('name', TextType::class, [
                'row_attr' => ['id' => 'question_name_block'],
                'label' => 'comment.form.name.label',
                'required' => true,
                'constraints' => [
                    new NotBlank(),
                    new Length(
                        min: 2,
                        max: 255,
                        minMessage: 'Значення занадто коротке. Введіть більше {{ limit }} символів',
                        maxMessage: 'Значення занадто довге. Введіть менше {{ limit }} символів',
                    ),
                ],
                'attr' => [
                    'placeholder' => 'comment.form.name.placeholder'
                ]
            ])
            ->add('email', EmailType::class, [
                'row_attr' => ['id' => 'question_email_block'],
                'label' => 'common.label.email',
                'required' => true,
                'constraints' => [
                    new NotBlank(),
                    new Email(mode: Email::VALIDATION_MODE_STRICT),
                ],
                'attr' => [
                    'placeholder' => 'comment.form.email.placeholder'
                ]
            ])
            ->add('phone', TelType::class, [
                'row_attr' => ['id' => 'question_phone_block'],
                'label' => 'common.label.phone',
                'required' => true,
                'constraints' => [
                    new NotBlank(),
                    new PhoneNumber(),
                ],
                'attr' => [
                    'placeholder' => 'comment.form.phone.placeholder'
                ]
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
            ->add('save', SubmitType::class, [
                'label' => 'comment.form.submit_question_btn',
                'row_attr' => ['class' => 'submit_block'],
                'attr' => [
                    'class' => 'button primary'
                ]
            ]);

        $this->preSubmit($builder);
        $this->preSetData($builder);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Comment::class,
            'csrf_protection' => false,
        ]);
    }
}

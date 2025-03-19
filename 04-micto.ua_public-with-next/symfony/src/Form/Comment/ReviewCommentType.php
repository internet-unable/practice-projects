<?php

namespace App\Form\Comment;

use App\Entity\Comment;
use App\Entity\CommentType;
use App\Form\DataTransformer\NumberDataTransformer;
use App\Service\Comment\CommentTypeService;
use EWZ\Bundle\RecaptchaBundle\Form\Type\EWZRecaptchaType;
use EWZ\Bundle\RecaptchaBundle\Validator\Constraints\IsTrue as RecaptchaTrue;
use Misd\PhoneNumberBundle\Validator\Constraints\PhoneNumber;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
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
use App\Validator\Constraints\NotFutureMonth;

class ReviewCommentType extends AbstractType
{
    use CommentFormUniTrait;

    public function __construct(
       private readonly NumberDataTransformer $dataTransformer,
       private readonly CommentTypeService $commentTypeService,
    ) {}

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $years = range(
            (new \DateTime('-20 years'))->format('Y'),
            (new \DateTime())->format('Y')
        );

        $years = array_combine($years, $years);
        $years['Рік'] = '';

        $builder
            ->add('entityType', HiddenType::class, [
                'mapped' => false,
            ])
            ->add('entityId', HiddenType::class, [
                'mapped' => false,
            ])
            ->add('type', ChoiceType::class, [
                'label' => 'comment.form.type',
                'row_attr' => ['id' => 'comment_type_block'],
                'expanded' => true,
                'choices' => [
                    'comment.type.'.CommentType::REVIEW->name => CommentType::REVIEW,
                    'comment.type.'.CommentType::COMPLAINT->name => CommentType::COMPLAINT,
                    'comment.type.'.CommentType::GRATITUDE->name => CommentType::GRATITUDE,
                ],
                'choice_attr' => function(CommentType $choice, $key, $value) {
                    // for JS events
                    return ['data-comment-type' => $choice->value];
                },
                'data' => null
            ])
            ->add('mark', ChoiceType::class, [
                'row_attr' => ['id' => 'comment_mark_block'],
                'label' => 'comment.form.mark',
                'required' => true,
                'expanded' => true,
                'multiple' => false,
                'choices' => [1=>1, 2=>2, 3=>3, 4=>4, 5=>5],
            ])
            ->add('monthOfVisit', ChoiceType::class, [
                'row_attr' => ['id' => 'comment_month_of_visit'],
                'label' => false,
                'required' => false,
                'multiple' => false,
                'choices' => $this->getAvailableMonths(),
                'constraints' => [
                    new NotFutureMonth('Цей місяць ще не настав'),
                ],
            ])
            ->add('yearOfVisit', ChoiceType::class, [
                'row_attr' => ['id' => 'comment_year_of_visit'],
                'label' => false,
                'required' => false,
                'multiple' => false,
                'choices' => array_reverse($years, true),
            ])
            ->add('name', TextType::class, [
                'row_attr' => ['id' => 'comment_name_block'],
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
                    'placeholder' => 'comment.form.name.placeholder',
                    'class' => 'phone'
                ]
            ])
            ->add('email', EmailType::class, [
                'row_attr' => ['id' => 'comment_email_block'],
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
                'row_attr' => ['id' => 'comment_phone_block'],
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
            ->add('text', TextareaType::class, [
                'label' => 'comment.form.text.label',
                'required' => true,
                'constraints' => [
                    new NotBlank(),
                ],
                'row_attr' => ['id' => 'comment_text_block'],
                'attr' => [
                    'placeholder' => 'comment.form.text.placeholder',
                    'rows' => 6,
                ]
            ])
            ->add('recaptcha', EWZRecaptchaType::class, [
                'row_attr' => ['class' => 'recaptcha'],
                'attr' => [
                    'data-callback' => 'onReCaptchaSuccess',
                    'row_attr' => ['class' => 'recaptcha'],
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
                'label' => 'comment.form.submit_btn',
                'row_attr' => ['class' => 'submit_block'],
                'attr' => [
                    'class' => 'button primary'
                ]
            ]);

        $builder->get('yearOfVisit')->addModelTransformer($this->dataTransformer);
        $builder->get('monthOfVisit')->addModelTransformer($this->dataTransformer);

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

    private function getAvailableMonths()
    {
        $months = array(
            'Місяць' => '',
            'Січень' => 1,
            'Лютий' => 2,
            'Березень' => 3,
            'Квітень' => 4,
            'Травень' => 5,
            'Червень' => 6,
            'Липень' => 7,
            'Серпень' => 8,
            'Вересень' => 9,
            'Жовтень' => 10,
            'Листопад' => 11,
            'Грудень' => 12
        );

        // $currentMonth = idate("m");

        // return array_slice($months, 0, $currentMonth + 1);
        return $months;
    }
}

<?php

namespace App\Controller\Cabinet\Form;

use SoftUa\UserBundle\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use EWZ\Bundle\RecaptchaBundle\Form\Type\EWZRecaptchaType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use EWZ\Bundle\RecaptchaBundle\Validator\Constraints\IsTrue as RecaptchaTrue;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\NotBlank;
use App\Validator\Constraints\EmailExists;
use Symfony\Contracts\Translation\TranslatorInterface;

class ResetPasswordRequestForm extends AbstractType
{
    public function __construct(
        private readonly TranslatorInterface $translator,
    ){}

    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('username', EmailType::class, [
                'required' => true,
                'constraints' => [
                    new Email(message: $this->translator->trans('auth.errors.not_valid_email'), mode: Email::VALIDATION_MODE_STRICT),
                    new NotBlank(['message' => $this->translator->trans('auth.errors.email_not_blank')]),
                    new EmailExists(['message' => $this->translator->trans('auth.errors.email_not_found')]),
                ],
                'label' => 'E-mail',
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
            ->add('submit', SubmitType::class, ['label' => 'auth.reset_pass']);
    }
}

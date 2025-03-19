<?php

namespace SoftUa\UserBundle\Admin\FormTypes\UppercaseText;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class UppercaseTextType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->addModelTransformer(new UppercaseTransformer());
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'attr' => ['style' => 'text-transform: uppercase;'],
        ]);
    }

    public function getParent(): string
    {
        return TextType::class;
    }
}

<?php

namespace App\Controller\Admin\Form;

use App\Entity\Address;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\DataMapperInterface;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Url;
use Traversable;
use function Symfony\Component\String\u;

class AddressType extends AbstractType implements DataMapperInterface
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->setDataMapper($this)
            ->add('address', TextType::class, [
                'label_format' => 'address.%name%',
                'constraints' => [
                    new NotBlank()
                ],
            ])
            ->add('latitude', NumberType::class, [
                'html5' => true,
                'label_format' => 'address.%name%',
                'required' => false,
                'scale' => 6,
            ])
            ->add('longitude', NumberType::class, [
                'html5' => true,
                'label_format' => 'address.%name%',
                'required' => false,
                'scale' => 6,
            ])
            ->add('mapUrl', TextType::class, [
                'label_format' => 'address.%name%',
                'required' => false,
                'constraints' => [
                    new Url()
                ],
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Address::class,
        ]);
    }

    /**
     * @param Address|null $viewData
     * @param Traversable $forms
     *
     * @return void
     */
    public function mapDataToForms($viewData, Traversable $forms): void
    {
        if (!$viewData) {
            return;
        }

        foreach (iterator_to_array($forms) as $property => $form) {
            if (!property_exists($viewData, $property)) {
                continue;
            }

            $method = u($property)->title()->ensureStart('get')->toString();
            $form->setData($viewData->$method());
        }
    }

    public function mapFormsToData(\Traversable $forms, mixed &$viewData): void
    {
        if (!$viewData) {
            $viewData = new Address();
        }

        foreach (iterator_to_array($forms) as $property => $form) {
            if (!property_exists($viewData, $property)) {
                continue;
            }

            $method = u($property)->title()->ensureStart('set')->toString();
            $value = $form->getData();

            if ('address' == $property && !$value) {
                $value = '';
            }

            $viewData->$method($value);
        }
    }
}


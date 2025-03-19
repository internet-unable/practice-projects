<?php

namespace App\GraphQL\User\Type;

use App\Entity\MultiStepRegistration;
use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\SourceField;
use TheCodingMachine\GraphQLite\Annotations\Type;

#[Type(class: MultiStepRegistration::class, name: 'MultiStepRegistration')]
#[SourceField(name: 'token')]
class MultiStepRegistrationType
{
    #[Field(outputType: '[Step]')]
    public function getSteps(MultiStepRegistration $registration): array
    {
        $steps = [];
        $stepsData = $registration->getData();

        foreach ($stepsData as $step => $stepData) {
            $steps[] = (new StepType())
                ->setStep((string)$step)
                ->setData($stepData);
        }

        return $steps;
    }
}

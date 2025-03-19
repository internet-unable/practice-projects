<?php

namespace App\GraphQL\User\Type;

use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\Type;

#[Type(name: 'Step')]
class StepType
{
    protected ?string $step = null;
    protected ?array $data = null;

    #[Field]
    public function getStep(): string
    {
        return $this->step;
    }

    public function setStep(string $step): self
    {
        $this->step = $step;

        return $this;
    }

    #[Field(outputType: '[StepData]')]
    public function getData(): array
    {
        $data = [];

        foreach ($this->data as $field => $value) {
            if ('password' == $field) {
                $value = null;
            }

            $data[] = (new StepDataType())
                ->setField((string)$field)
                ->setValue($value);
        }

        return $data;
    }

    public function setData(array $data): self
    {
        $this->data = $data;

        return $this;
    }
}

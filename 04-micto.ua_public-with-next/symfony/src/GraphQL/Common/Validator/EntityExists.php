<?php
namespace App\GraphQL\Common\Validator;

#[\Attribute(\Attribute::TARGET_PROPERTY)]
class EntityExists
{
    public function __construct(
        public string $entityClass,
        public string $message = 'Entity with ID {{ id }} does not exist.'
    ) {
    }

    public function getConstraints(): array
    {
        return [
            new EntityExistsConstraint([
                'entityClass' => $this->entityClass,
                'message' => $this->message,
            ]),
        ];
    }
}

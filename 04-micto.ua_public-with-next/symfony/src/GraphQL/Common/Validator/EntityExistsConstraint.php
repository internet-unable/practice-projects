<?php
namespace App\GraphQL\Common\Validator;

use Symfony\Component\Validator\Constraint;

class EntityExistsConstraint extends Constraint
{
    public string $message = 'Entity with ID {{ id }} does not exist.';
    public string $entityClass;
}

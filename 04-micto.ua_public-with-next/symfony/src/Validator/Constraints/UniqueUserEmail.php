<?php
namespace App\Validator\Constraints;

use Symfony\Component\Validator\Constraint;

#[\Attribute(\Attribute::TARGET_PROPERTY | \Attribute::TARGET_METHOD | \Attribute::IS_REPEATABLE)]
class UniqueUserEmail extends Constraint
{
    public const NOT_UNIQUE_EMAIL_ERROR = '92f01215-d696-4bec-bdeb-2842820655f6';

    protected const ERROR_NAMES = [
        self::NOT_UNIQUE_EMAIL_ERROR => 'NOT_UNIQUE_EMAIL_ERROR',
    ];

    public string $message = 'The email is in use by another user';

    public function __construct(
        string $message = null,
        ?array $groups = null,
        mixed $payload = null
    ) {
        parent::__construct([], $groups, $payload);

        $this->message = $message ?? $this->message;
    }
}

<?php
namespace App\Validator\Constraints;

use Symfony\Component\Validator\Constraint;

#[\Attribute(\Attribute::TARGET_PROPERTY | \Attribute::TARGET_METHOD | \Attribute::IS_REPEATABLE)]
class UniqueUserPhone extends Constraint
{
    public const NOT_UNIQUE_PHONE_ERROR = '0559ccbd-59d6-41a3-bf68-162a139376ba';

    protected const ERROR_NAMES = [
        self::NOT_UNIQUE_PHONE_ERROR => 'NOT_UNIQUE_PHONE_ERROR',
    ];

    public string $message = 'The phone number is in use by another user';

    public function __construct(
        string $message = null,
        ?array $groups = null,
        mixed $payload = null
    ) {
        parent::__construct([], $groups, $payload);

        $this->message = $message ?? $this->message;
    }
}

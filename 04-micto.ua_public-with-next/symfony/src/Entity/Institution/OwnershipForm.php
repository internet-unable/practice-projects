<?php

namespace App\Entity\Institution;

use Symfony\Contracts\Translation\TranslatableInterface;
use Symfony\Contracts\Translation\TranslatorInterface;

enum OwnershipForm: string implements TranslatableInterface
{
    // Create migration if modified
    case STATE = 'state';
    case PRIVATE = 'private';
    case COLLECTIVE = 'collective';

    public function trans(TranslatorInterface $translator, string $locale = null): string
    {
        return $translator->trans(
            'institution.ownership.'.strtoupper($this->value),
            locale: $locale
        );
    }
}

<?php

namespace App\Entity\Institution;

use Symfony\Contracts\Translation\TranslatableInterface;
use Symfony\Contracts\Translation\TranslatorInterface;

enum LegalForm: string implements TranslatableInterface
{
    // Create migration if modified
    case COMPANY = 'company';
    case PRIVATE = 'private';
    case COLLECTIVE = 'concern';
    case CORPORATION = 'corporation';

    public function trans(TranslatorInterface $translator, string $locale = null): string
    {
        return $translator->trans(
            id: 'institution.legal_form.'.strtoupper($this->value),
            locale: $locale,
        );
    }
}

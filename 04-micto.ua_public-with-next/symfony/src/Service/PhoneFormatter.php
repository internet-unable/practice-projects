<?php

namespace App\Service;

use libphonenumber\PhoneNumber;
use libphonenumber\PhoneNumberFormat;
use libphonenumber\PhoneNumberUtil;

class PhoneFormatter
{
    public function __construct(
        private readonly PhoneNumberUtil $phoneNumberUtil,
        private readonly string $defaultPhoneRegion = 'UA',
    ) {}

    public function getClearPhoneNumber(string $phone): ?string
    {
        $phone = $this->getPhoneNumber($phone);

        if (!$phone) {
            return null;
        }

        return $this->phoneNumberUtil->format($phone, PhoneNumberFormat::E164);
    }

    // todo: create twig filter
    public function getFormattedPhoneNumber(string $phone): ?string
    {
        if (!($phone = $this->getClearPhoneNumber($phone))) {
            return null;
        }

//        if (str_starts_with($phone, '+38')) {
//            return preg_replace('/^(\+38)(0\d{2})(\d{3})(\d{2})(\d+)$/', '$1($2) $3-$4-$5', $phone);
//        }

        return $this->phoneNumberUtil->format(
            $this->getPhoneNumber($phone),
            PhoneNumberFormat::INTERNATIONAL
        );
    }

    private function getPhoneNumber(string $phone): ?PhoneNumber
    {
        return $this->phoneNumberUtil->parse($phone, $this->defaultPhoneRegion);
    }
}

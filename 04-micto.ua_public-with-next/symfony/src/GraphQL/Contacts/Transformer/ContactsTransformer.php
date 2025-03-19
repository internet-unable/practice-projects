<?php

namespace App\GraphQL\Contacts\Transformer;

use App\GraphQL\Contacts\Type\ContactsInput;
use App\GraphQL\Contacts\Type\ContactsType;
use App\GraphQL\Contacts\Type\EmailType;
use App\GraphQL\Contacts\Type\PhoneType;

class ContactsTransformer
{
    /**
     * Converts array of contacts into ContactsType
     * Array format:
     * [
     *   'emails' => [
     *      [
     *          'email' => 'test@test.ua',
     *          'comment' => 'Office',
     *      ],
     *   ],
     *   'phones' => [
     *      [
     *          'number' => '+380961111111',
     *          'comment' => 'Office',
     *      ],
     *   ],
     * ],
     *
     * @param array|null $contactsArr
     * @return ContactsType|null
     */
    public function arrayToType(?array $contactsArr): ?ContactsType
    {
        if (!$contactsArr) {
            return null;
        }

        $contactsType = new ContactsType();

        if ($emails = $contactsArr['emails'] ?? []) {
            foreach ($emails as $email) {
                $contactsType->emails[] = (new EmailType())
                    ->setEmail($email['email'])
                    ->setComment($email['comment'] ?? null);
            }
        }

        if ($phones = $contactsArr['phones'] ?? []) {
            foreach ($phones as $phone) {
                $contactsType->phones[] = (new PhoneType())
                    ->setNumber($phone['number'])
                    ->setComment($phone['comment'] ?? null);
            }
        }

        return $contactsType;
    }

    public function inputToArray(ContactsInput $input): ?array
    {
        $result = [];

        if ($input->email) {
            $result['email'] = $input->email;
        }

        if ($emails = $input->emails) {
            foreach ($emails as $email) {
                $result['emails'][] = [
                    'email' => $email->getEmail(),
                    'comment' => $email->getComment(),
                ];
            }
        }

        if ($phones = $input->phones) {
            foreach ($phones as $phone) {
                $result['phones'][] = [
                    'number' => $phone->getNumber(),
                    'comment' => $phone->getComment(),
                ];
            }
        }

        return $result;
    }
}

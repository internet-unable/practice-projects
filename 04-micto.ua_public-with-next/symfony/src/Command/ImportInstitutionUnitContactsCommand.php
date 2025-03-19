<?php

namespace App\Command;

use App\Entity\Institution\InstitutionUnit;
use App\Repository\Institution\InstitutionUnitRepository;
use App\Service\PhoneFormatter;
use Doctrine\ORM\EntityManagerInterface;
use libphonenumber\NumberParseException;
use libphonenumber\PhoneNumberFormat;
use libphonenumber\PhoneNumberUtil;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Helper\ProgressBar;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\String\Slugger\AsciiSlugger;

#[AsCommand(
    name: 'app:unit-contacts-import',
    description: 'Import institution unit contacts from old db',
)]
class ImportInstitutionUnitContactsCommand extends Command
{
    public function __construct(
        protected readonly InstitutionUnitRepository $unitRepo,
        protected readonly PhoneNumberUtil $phoneNumberUtil,
        protected readonly PhoneFormatter $phoneFormatter,
        protected readonly EntityManagerInterface $em,
    )
    {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $slugger = new AsciiSlugger();
        $conn = $this->em->getConnection();

        $sql = "SELECT * FROM micto_old.products_add_info";

        $res = $conn->prepare($sql)->executeQuery()->fetchAllAssociative();

        $progressBar = new ProgressBar($output);

        foreach ($progressBar->iterate($res) as $i => $row) {
            if ($i % 50 === 0) {
                $this->em->clear();
            }

            /** @var InstitutionUnit|null $unit */
            $unit = $this->unitRepo->findOneBy(['oldId' => $row['product_id']]);

            if (!$unit) {
                continue;
            }

            $phones = [];

            foreach ($this->getPhones($row['secy_phone']) as $phone) {
                $phones[] = [
                    'number' => $phone,
                    'comment' => '',
                ];
            }

            foreach ($this->getPhones($row['secy_fax']) as $phone) {
                $phones[] = [
                    'number' => $phone,
                    'comment' => 'Факс',
                ];
            }

            $row['email'] = trim($row['email']);
            $email = !empty($row['email']) && filter_var($row['email'], FILTER_VALIDATE_EMAIL) ? $row['email'] : null;

            if (!$phones && !$email) {
                continue;
            }

            $emails = [];

            if ($email) {
                $emails[] = [
                    'email' => $email,
                    'comment' => '',
                ];
            }

            try {
                $unit->setContacts([
                    'emails' => $emails,
                    'phones' => $phones,
                ]);

                $this->em->persist($unit);
                $this->em->flush();
            } catch (\Exception $e) {
                $io->error($e->getMessage());
            }
        }

        $progressBar->finish();

        return Command::SUCCESS;
    }

    private function getPhones(string $phoneNumber): array
    {
        if ('-' == trim($phoneNumber) || empty(trim($phoneNumber))) {
            return [];
        }

        $phoneNumber = preg_replace('/[\(\)]/', '', $phoneNumber);

        if (str_starts_with($phoneNumber, '80')) {
            $phoneNumber = '3'.$phoneNumber;
        }

        if ($this->validate($phoneNumber)) {
            return [
                $this->phoneFormatter->getClearPhoneNumber($phoneNumber)
            ];
        }

        $res = [];

        foreach ($this->phoneNumberUtil->findNumbers($phoneNumber, 'UA') as $phone) {
            $res[] = $this->phoneNumberUtil->format($phone->number(), PhoneNumberFormat::E164);
        }

        return $res;
    }

    private function validate($phoneNumber)
    {
        try {
            $numberProto = $this->phoneNumberUtil->parse($phoneNumber, 'UA');

            return $this->phoneNumberUtil->isValidNumber($numberProto);
        } catch (NumberParseException $e) {
            return false;
        }
    }
}

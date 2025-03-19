<?php

namespace App\Command;

use App\Entity\CityDistrict;
use App\Entity\Institution\Institution;
use App\Repository\CityDistrictRepository;
use App\Repository\CityRepository;
use App\Repository\Institution\InstitutionRepository;
use App\Repository\Institution\InstitutionUnitTypeRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Helper\ProgressBar;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\String\Slugger\AsciiSlugger;

#[AsCommand(
    name: 'app:institution-import',
    description: 'Import institutions from old db',
)]
class InstitutionImportCommand extends Command
{
    public function __construct(
        protected readonly InstitutionRepository $institutionRepository,
        protected readonly InstitutionUnitTypeRepository $typeRepository,
        protected readonly CityRepository $cityRepository,
        protected readonly CityDistrictRepository $cityDistrictRepository,
        protected readonly EntityManagerInterface $em
    )
    {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $slugger = new AsciiSlugger();
        $conn = $this->em->getConnection();

        $sql = "SELECT 
            p.product_id, p.product, p.pn, p.category_id, p.product_type_id, p.detail_description, p.model,
            pd.url_code, GROUP_CONCAT(pc.category_id SEPARATOR ',') as cats, p.deleted
        FROM Products p
        LEFT JOIN Products_Data pd ON p.product_id = pd.product_id
        LEFT JOIN Products_Categoryes pc ON pc.product_id = pd.product_id
        WHERE p.category_id NOT IN(80, 10, 210)
        GROUP BY p.product_id";

        $res = $conn->prepare($sql)->executeQuery()->fetchAllAssociative();

        $progressBar = new ProgressBar($output);

        foreach ($progressBar->iterate($res) as $i => $inst) {
            if ($i % 50 === 0) {
                $this->em->clear();
            }

            $institution = $this->institutionRepository->findOneBy(['oldId' => $inst['product_id']]);

            if ($institution) {
                continue;
            }

            $slug = trim($inst['url_code']);

            if (!$slug) {
                $slug = $slugger->slug(trim($inst['product']), '-', 'ua')->lower();
                $slug = $slug->toString();
            }

            $edrpou = preg_replace('/[^\d]/', '', $inst['pn']);

            if (strlen($edrpou) != 8) {
                $edrpou = null;
            }

            $description = trim($inst['detail_description']);

            try {
                $institution = new Institution();
                $institution->setName($inst['product']);
                $institution->setOldId($inst['product_id']);
                $institution->setSlug($slug);
                $institution->setEdrpou($edrpou);
                $institution->setDescription($description ?: null);
                $institution->setIsPublished(!$inst['deleted']);

                $this->setInstitutionType($institution, $inst);
                $this->setCity($institution, $inst);

                $this->em->persist($institution);
                $this->em->flush();
            } catch (\Exception $e) {
                $io->error($e->getMessage());
            }
        }

        $progressBar->finish();

        return Command::SUCCESS;
    }

    protected function setInstitutionType(Institution $institution, array $data)
    {
        $type = $this->typeRepository->findOneBy(['oldId' => $data['product_type_id']]);

        if (!$type) {
            $type = $this->typeRepository->findOneBy(['name' => trim($data['model'])]);
        }

        if ($type) {
            $institution->setInstitutionType($type);
        }
    }

    protected function setCity(Institution $institution, array $data)
    {
        $ids = explode(',', $data['cats']);
        $ids[] = $data['category_id'];
        $ids = array_unique($ids);

        $city = $this->cityRepository->findOneBy(['oldId' => $ids]);

        if ($city) {
            $institution->setCity($city);

            return;
        }

        /** @var CityDistrict|null $cityDistrict */
        $cityDistrict = $this->cityDistrictRepository->findOneBy(['oldId' => $ids]);

        if (!$cityDistrict) {
            throw new \Exception(sprintf('City not found for the institution #%d', $data['product_id']));
        }

        $institution->setCityDistrict($cityDistrict);
        $institution->setCity($cityDistrict->getCity());
    }
}

<?php

namespace App\Service\Institution;

use App\Entity\Institution\InstitutionUnitType;
use App\Repository\Institution\InstitutionUnitTypeRepository;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class UnitTypeUrlGenerator
{
    public function __construct(
        private readonly UrlGeneratorInterface $generator,
        private readonly InstitutionUnitTypeRepository $unitTypeRepo,
    ) {}

    public function getUrl(InstitutionUnitType $type, bool $isAbsolute = false): string
    {
        $referenceType = $isAbsolute ? UrlGeneratorInterface::ABSOLUTE_URL : UrlGeneratorInterface::ABSOLUTE_PATH;

        if (empty($type->getOldId())) {
            $type->setOldId($type->getId() + 20);

            $this->unitTypeRepo->save($type);
        }

        return $this->generator->generate(
            'institution_type_page',
            [
                'id' => $type->getOldId(),
                'slug' => $type->getSlug()
            ],
            $referenceType
        );
    }
}

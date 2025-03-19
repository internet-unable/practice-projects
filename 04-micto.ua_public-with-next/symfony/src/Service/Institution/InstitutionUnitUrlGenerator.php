<?php

namespace App\Service\Institution;

use App\Entity\Institution\InstitutionUnit;
use App\Repository\Institution\InstitutionUnitRepository;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class InstitutionUnitUrlGenerator
{
    public function __construct(
        private readonly UrlGeneratorInterface $generator,
        private readonly InstitutionUnitRepository $unitRepo,
    ){}

    public function getUrl(InstitutionUnit $unit, bool $isAbsolute = false): string
    {
        $referenceType = $isAbsolute ? UrlGeneratorInterface::ABSOLUTE_URL : UrlGeneratorInterface::ABSOLUTE_PATH;

        if (empty($unit->getOldId())) {
            $unit->setOldId($unit->getId() + 164000);

            $this->unitRepo->save($unit);
        }

        return $this->url($unit->getOldId(), $unit->getSlug(), $referenceType);
    }

    public function getUrlByArray(array $unit, bool $isAbsolute = false): string
    {
        $referenceType = $isAbsolute ? UrlGeneratorInterface::ABSOLUTE_URL : UrlGeneratorInterface::ABSOLUTE_PATH;

        return $this->url($unit['oldId'], $unit['slug'], $referenceType);
    }

    private function url(int $id, string $slug, int $referenceType): string
    {
        return $this->generator->generate(
            'institution_unit_page',
            [
                'id' => $id,
                'slug' => $slug
            ],
            $referenceType
        );
    }
}

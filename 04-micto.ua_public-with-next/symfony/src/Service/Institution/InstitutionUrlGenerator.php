<?php

namespace App\Service\Institution;

use App\Entity\Institution\Institution;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class InstitutionUrlGenerator
{
    public function __construct(
        private readonly UrlGeneratorInterface $generator,
    ){}

    public function getUrl(Institution $institution, bool $isAbsolute = false): string
    {
        $referenceType = $isAbsolute ? UrlGeneratorInterface::ABSOLUTE_URL : UrlGeneratorInterface::ABSOLUTE_PATH;

        return $this->generator->generate(
            'institution_page',
            [
                'id' => $institution->getId(),
                'slug' => $institution->getSlug()
            ],
            $referenceType
        );
    }
}

<?php

namespace App\Service\Institution;

use App\Entity\Institution\Institution;
use App\Repository\Institution\InstitutionRepository;

class InstitutionService
{
    public function __construct(
        private readonly InstitutionRepository $institutionRepo,
    ){}

    public function save(Institution $institution): void
    {
        // set other data that needs to be modified when saving

        $this->institutionRepo->save($institution);
    }
}

<?php

namespace App\GraphQL\Institution\Transformer;

use App\Entity\Institution\Institution;
use App\GraphQL\Common\Helper\ObjectsCloneHelper;
use App\GraphQL\Institution\Input\InstitutionInput;

class InstitutionTransformer
{
    public function inputToInstitution(InstitutionInput $input, ?Institution $institution): Institution
    {
        if (!$institution) {
            $institution = new Institution();
        }

        ObjectsCloneHelper::setScalarProperties($input, $institution, [
            'name',
            'fullName',
            'description',
        ]);

        return $institution;
    }
}

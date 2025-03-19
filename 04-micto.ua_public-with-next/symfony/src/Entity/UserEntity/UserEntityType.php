<?php

namespace App\Entity\UserEntity;

/*
 * !!! Remember to create migration if changed
 */
enum UserEntityType: string {
    case INSTITUTION = 'Institution';
    case INSTITUTION_UNIT = 'InstitutionUnit';
    case UNIT_DEPARTMENT = 'InstitutionUnitDepartment';
}

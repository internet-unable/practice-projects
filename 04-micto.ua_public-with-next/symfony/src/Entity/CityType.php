<?php

namespace App\Entity;

enum CityType: string
{
    case SPECIAL = 'special';
    case CITY = 'city';
    case VILLAGE = 'village';// село
    case VILLAGE_S = 'village_s';// селище
    case SMT = 'smt';
}

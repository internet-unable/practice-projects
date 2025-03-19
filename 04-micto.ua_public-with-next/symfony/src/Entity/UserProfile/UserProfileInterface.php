<?php

namespace App\Entity\UserProfile;

use SoftUa\UserBundle\Entity\User;

interface UserProfileInterface
{
    public function getUser(): User;
}

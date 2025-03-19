<?php

namespace App\Router;

use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class UserRouter
{
    public function __construct(
        readonly private RouterInterface $router,
    ){}

    public function getUserHomePath(UserInterface $user): string
    {
        // For now all roles are redirected to the cabinet page
        return $this->router->generate('cabinet');

        /*if ($this->security->isGranted('INSTITUTION_MANAGER', $user)) {
            return $this->router->generate('institution_cabinet');
        } elseif ($this->security->isGranted('PATIENT', $user)) {
            return $this->router->generate('patient_cabinet');
        } elseif ($this->security->isGranted('ROLE_ADMIN', $user)) {
            return $this->router->generate('admin');
        }

        return $this->router->generate('home');*/
    }
}

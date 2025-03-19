<?php

namespace App\Controller\Admin;

use App\Entity\Area;
use App\Entity\City;
use App\Entity\CityDistrict;
use App\Entity\Comment;
use App\Entity\District;
use App\Entity\Institution\Institution;
use App\Entity\Institution\InstitutionUnit;
use App\Entity\Institution\InstitutionUnitDepartment;
use App\Entity\Institution\InstitutionUnitType;
use App\Entity\OTG;
use App\Entity\UserEntity\UserEntityPermission;
use EasyCorp\Bundle\EasyAdminBundle\Config\Assets;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use SoftUa\UserBundle\Configuration\Permission\UserBundlePermissions;
use SoftUa\UserBundle\Entity\Role;
use SoftUa\UserBundle\Entity\User;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\Translation\TranslatorInterface;

class DashboardController extends AbstractDashboardController
{
    public function __construct(
        private readonly TranslatorInterface $translator,
    ) {}

    #[Route('/admin-area/{_locale?uk}', name: 'admin')]
    public function index(): Response
    {
        return $this->render('/admin/dashboard.html.twig');
    }

    public function configureAssets(): Assets
    {
        $assets = parent::configureAssets();
        $assets->addWebpackEncoreEntry('admin');

        return $assets;
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle($this->translator->trans('dashboard.title', domain: 'admin'))
            ->setLocales([
                'uk' => '🇺🇦 Українська',
                'en' => '🇬🇧 English',
            ])
            ->renderContentMaximized()
            ->setTranslationDomain('admin');
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::linkToDashboard('dashboard.menu_link', 'fa fa-home');

        yield MenuItem::linkToRoute('dashboard.home_link', 'fa fa-globe', 'home')
            ->setLinkTarget('_blank');
        yield MenuItem::section('TU.menu_section');
        yield MenuItem::linkToCrud('area.plural_title', 'fa-solid fa-map', Area::class);
        yield MenuItem::linkToCrud('district.plural_title', 'fa-solid fa-map', District::class);
        yield MenuItem::linkToCrud('otg.plural_title', 'fa-solid fa-map', OTG::class);
        yield MenuItem::linkToCrud('city.plural_title', 'fa-solid fa-map', City::class);
        yield MenuItem::linkToCrud('city_district.plural_title', 'fa-solid fa-map', CityDistrict::class);
        
        yield MenuItem::section('institution.menu_section');
        yield MenuItem::linkToCrud('institution_type.plural_title', 'fa-solid fa-hospital', InstitutionUnitType::class);
        yield MenuItem::linkToCrud('institution.plural_title', 'fa-solid fa-hospital', Institution::class);
        yield MenuItem::linkToCrud('institution_unit.plural_title', 'fa-solid fa-hospital', InstitutionUnit::class);
        yield MenuItem::linkToCrud('institution_department.plural_title', 'fa-solid fa-hospital', InstitutionUnitDepartment::class);

        yield MenuItem::section('user.plural_title');
        yield MenuItem::linkToCrud('role.plural_title', 'fa-solid fa-user', Role::class)
            ->setPermission(UserBundlePermissions::ROLES_MANAGEMENT);
        yield MenuItem::linkToCrud('user.plural_title', 'fa-solid fa-user', User::class);
        yield MenuItem::linkToCrud('user_entity.menu_section', 'fa-solid fa-user', UserEntityPermission::class)
            ->setPermission(UserBundlePermissions::USERS_ENTITY_ACCESS);

        yield MenuItem::section('comment.menu_label');
        yield MenuItem::linkToCrud('comment.plural_title', 'fas fa-comment', Comment::class);
    }
}

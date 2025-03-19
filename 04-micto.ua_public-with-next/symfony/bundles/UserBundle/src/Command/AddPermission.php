<?php

namespace SoftUa\UserBundle\Command;

use SoftUa\UserBundle\Entity\Role;
use SoftUa\UserBundle\Entity\RolePermission;
use SoftUa\UserBundle\Repository\PermissionRepository;
use SoftUa\UserBundle\Repository\RoleRepository;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\StyleInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(name: 'rbac:role:add_permission', description: 'Create new permission')]
class AddPermission extends Command
{
    private StyleInterface $io;

    public function __construct(
        private readonly PermissionRepository $permissionRepository,
        private readonly RoleRepository $roleRepository,
        string $name = null
    ){
        parent::__construct($name);
    }

    protected function configure(): void
    {
        $this->setHelp('This command allows you to create user role');

        parent::configure();
    }

    protected function initialize(InputInterface $input, OutputInterface $output): void
    {
        parent::initialize($input, $output);

        $this->io = new SymfonyStyle($input, $output);
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $this->io->title('Add Permission to the Role');

        $rolesList = $this->roleRepository->getCodeList();

        $role = null;
        while (!$role) {
            $roleCode = $this->io->choice(
                'Choose the role',
                $rolesList,
                $rolesList[0]
            );

            if ($roleCode == Role::ROLE_SUPER_ADMIN) {
                $this->io->success('Super admin already has all permissions');

                return Command::SUCCESS;
            }

            $role = $this->getRole($roleCode);
        }

        $permissionsList = array_diff_key(
            $this->permissionRepository->getListFromBundles(), // fromBundles
            array_flip($role->getPermissionCodes()) // existing
        );

        $permissions = $this->io->choice(
            'Choose permissions (comma separated, use Tab key for autocomplete)',
            $permissionsList,
            null,
            true
        );

        $this->io->text('Adding permissions...');

        foreach ($permissions as $permission) {
            if (!$this->createPermission($permission, $role)) {
                $this->io->error("Unable to add permission '$permission'");

                return Command::FAILURE;
            }
        }

        $this->io->success('Success');

        return Command::SUCCESS;
    }

    private function getRole(string $code): ?Role
    {
        if (!$role = $this->roleRepository->getByCode($code)) {
            $this->io->error('Role not found');
        }

        return $role;
    }

    private function createPermission(string $code, Role $role): ?RolePermission
    {
        $permission = new RolePermission();
        $permission->setCode($code);
        $permission->setRole($role);
        $this->permissionRepository->save($permission);

        return $permission;
    }
}

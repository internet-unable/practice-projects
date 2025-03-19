<?php

namespace SoftUa\UserBundle\Command;

use SoftUa\UserBundle\Entity\Role;
use SoftUa\UserBundle\Repository\PermissionRepository;
use SoftUa\UserBundle\Repository\RoleRepository;
use Symfony\Bundle\MakerBundle\Validator;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\StyleInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\PasswordHasher\PasswordHasherInterface;
use Symfony\Component\String\Slugger\SluggerInterface;

#[AsCommand(name: 'rbac:role:add', description: 'Create new role')]
class AddRole extends Command
{
    private StyleInterface $io;
    private PasswordHasherInterface $passwordHasher;

    public function __construct(
        private readonly RoleRepository $roleRepository,
        private readonly PermissionRepository $permissionRepository,
        private readonly SluggerInterface $slugger,
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
        $this->io->title('Create new role');

        $description = $this->io->ask('Enter role description', validator: [Validator::class, 'notBlank']);
        $code = $this->askRoleCode(strtolower($this->slugger->slug($description, '_')));

        $this->io->text('Creating role...');
        $role = $this->createRole($code, $description);
        $this->io->success('Done');

        $permissionList = $this->permissionRepository->getList();

        if ($permissionList && $this->io->confirm('Would you like to add permissions to this role?')) {
            $permissions = $this->io->choice(
                'Enter comma-separated permissions',
                $permissionList,
                default: null,
                multiSelect: true
            );

            $this->addRolePermissions($role, $permissions);

            $this->io->success('Success');
        }

        /*if ($this->io->confirm('Would you like to add another role?', false)) {
            $this->execute($input, $output);
        }*/

        return Command::SUCCESS;
    }

    private function askRoleCode(string $default = null): string
    {
        $code = $this->io->ask(
            'Enter role name (code)',
            default: $default,
            validator: [Validator::class, 'notBlank']
        );

        if ($this->roleRepository->findOneBy(['code'=>$code])) {
            $this->io->error("Role with name $code already exists");

            $code = $this->askRoleCode();
        }

        return $code;
    }

    private function createRole(string $code, string $description): Role
    {
        $role = new Role();
        $role->setCode($code);
        $role->setDescription($description);
        $this->roleRepository->save($role);

        return $role;
    }

    private function addRolePermissions(Role $role, array $permissions): void
    {
        foreach ($permissions as $permission) {
            $role->addPermission($permission);
        }

        $this->roleRepository->save($role);
    }
}

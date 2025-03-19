<?php

namespace SoftUa\UserBundle\Command;

use Doctrine\Common\Collections\ArrayCollection;
use SoftUa\UserBundle\Entity\Role;
use SoftUa\UserBundle\Entity\User;
use SoftUa\UserBundle\Repository\RoleRepository;
use SoftUa\UserBundle\Repository\UserRepository;
use Symfony\Bundle\MakerBundle\Validator;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\StyleInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\PasswordHasher\Hasher\PasswordHasherFactoryInterface;
use Symfony\Component\PasswordHasher\PasswordHasherInterface;

#[AsCommand(name: 'user:add', description: 'Create new user')]
class AddUser extends Command
{
    private StyleInterface $io;
    private PasswordHasherInterface $passwordHasher;

    public function __construct(
        private readonly UserRepository $userRepository,
        private readonly RoleRepository $roleRepository,
        PasswordHasherFactoryInterface $passwordHasherFactory,
        string $name = null
    ){
        parent::__construct($name);

        $this->passwordHasher = $passwordHasherFactory->getPasswordHasher(User::class);
    }

    protected function configure(): void
    {
        $this->setHelp('This command allows you to create users');

        parent::configure();
    }

    protected function initialize(InputInterface $input, OutputInterface $output): void
    {
        parent::initialize($input, $output);

        $this->io = new SymfonyStyle($input, $output);
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $this->io->title('Create new User');

        $email = $this->askEmail();
        $password = $this->io->askHidden(
            'Enter user password',
            [Validator::class, 'notBlank']
        );
        $name = $this->io->ask(
            'Enter user\'s name',
            $email,
            validator: [Validator::class, 'notBlank']
        );

        $isAdmin = $this->io->confirm('Is admin user?', false);
        $isInstitution = $this->io->confirm('Is institution user?', false);

        $rolesList = $this->roleRepository->getCodeList();

        $roles = $this->io->choice(
            'Choose user roles (You can enter multiple comma-separated choices)',
            $rolesList,
            $rolesList[0]
        );

        if (!is_array($roles)) {
            $roles = [$roles];
        }

        $this->io->table([], [
            ['email', $email],
            ['name', $name],
            ['is admin', $isAdmin ? 'yes' : 'no'],
            ['is institution', $isInstitution ? 'yes' : 'no'],
            ['roles', json_encode($roles)],
        ]);

        if ($this->io->confirm('Is all this OK?')) {
            $this->io->text('Creating roles...');
            $roleObjects = $this->createRoles($roles);

            $this->io->text('Creating user...');
            $this->createUser($email, $password, $name, $isAdmin, $isInstitution, $roleObjects);

            $this->io->success('Success');
        } else {
            $this->io->error('Canceled');
        }

        if ($this->io->confirm('Would you like to add another one?', false)) {
            $this->execute($input, $output);
        }

        return Command::SUCCESS;
    }



    private function createRoles(array $roleCodes): array
    {
        $roles = [];
        foreach ($roleCodes as $roleCode) {
            if ($role = $this->roleRepository->getByCode($roleCode)) {
                $roles[] = $role;

                continue;
            }

            $role = new Role();
            $role->setCode($roleCode);
            $role->setDescription($roleCode);// todo: make not required
            $this->roleRepository->save($role);

            $roles[] = $role;
        }

        return $roles;
    }

    /**
     * @param string $email
     * @param string $password
     * @param string $name
     * @param Role[] $roles
     *
     * @return User
     */
    private function createUser(
        string $email,
        string $password,
        string $name,
        bool $isAdmin,
        bool $isInstitution,
        array $roles
    ): User
    {
        $user = new User();
        $user->setEmail($email);
        $user->setPassword($this->passwordHasher->hash($password));
        $user->setFirstName($name);
        $user->setIsAdminUser($isAdmin);
        $user->setIsInstitution($isInstitution);
        $user->setRolesCollection(new ArrayCollection($roles));
        $this->userRepository->save($user);

        return $user;
    }

    private function askEmail(): string
    {
        $email = $this->io->ask(
            'Enter user email',
            default: time().'test@erp.test',
            validator: [Validator::class, 'validateEmailAddress']
        );

        if ($this->userRepository->getByLogin($email)) {
            $this->io->error("User with the same login already exists");

            $email = $this->askEmail();
        }

        return $email;
    }
}

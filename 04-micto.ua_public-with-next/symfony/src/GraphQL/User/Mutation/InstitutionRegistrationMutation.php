<?php

namespace App\GraphQL\User\Mutation;

use App\Entity\MultiStepRegistration;
use App\GraphQL\Common\Validator\InputValidator;
use App\GraphQL\User\InstitutionUserInput\InstitutionRegistrationStep1Input;
use App\GraphQL\User\InstitutionUserInput\InstitutionRegistrationStep2Input;
use App\GraphQL\User\InstitutionUserInput\InstitutionRegistrationStep3Input;
use App\GraphQL\User\Type\AuthorizationType;
use App\Repository\MultiStepRegistrationRepository;
use App\Service\MailerService;
use SoftUa\UserBundle\Entity\User;
use SoftUa\UserBundle\Repository\RoleRepository;
use SoftUa\UserBundle\Repository\UserRepository;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use TheCodingMachine\GraphQLite\Annotations\Mutation;
use TheCodingMachine\GraphQLite\Exceptions\GraphQLException;

class InstitutionRegistrationMutation
{
    public function __construct(
        private readonly UserRepository $userRepo,
        private readonly InputValidator $validator,
        private readonly MultiStepRegistrationRepository $registrationRepos,
        private readonly UserPasswordHasherInterface $passwordHasher,
        private readonly AuthorizationType $authorizationType,
        private readonly RoleRepository $roleRepository,
        private readonly MailerService $mailerService,
    ) {}

    #[Mutation]
    public function registerInstitutionStep1(InstitutionRegistrationStep1Input $input, ?string $token = null): MultiStepRegistration
    {
        $this->validator->validate($input);

        $registration = $token ? $this->registrationRepos->getOneByToken($token) : null;

        if (!$registration) {
            $registration = $this->registrationRepos->create();
        }

        $this->registrationRepos->setStepData($registration, 1, $input->toArray());

        return $registration;
    }

    #[Mutation]
    public function registerInstitutionStep2(InstitutionRegistrationStep2Input $input, string $token): MultiStepRegistration
    {
        $this->validator->validate($input);

        $registration = $this->registrationRepos->getOneByToken($token);

        if (!$registration) {
            throw new GraphQLException(
                'Registration data not found',
                code: 404,
                extensions: ['field' => 'token'],
            );
        }

        $this->registrationRepos->setStepData($registration, 2, $input->toArray());

        return $registration;
    }

    #[Mutation]
    public function registerInstitutionStep3(InstitutionRegistrationStep3Input $input, string $token): MultiStepRegistration
    {
        $this->validator->validate($input);

        $registration = $this->registrationRepos->getOneByToken($token);

        if (!$registration) {
            throw new GraphQLException(
                'Registration data not found',
                code: 404,
                extensions: ['field' => 'token'],
            );
        }

        $this->registrationRepos->setStepData($registration, 3, $input->toArray());

        return $registration;
    }

    #[Mutation]
    public function registerInstitutionComplete(string $token): AuthorizationType
    {
        $registration = $this->registrationRepos->getOneByToken($token);

        if (!$registration) {
            throw new GraphQLException(
                'Registration data not found',
                code: 404,
                extensions: ['field' => 'token'],
            );
        }

        if (3 != count($registration->getData())) {
            throw new GraphQLException('Not all steps have been completed. Registration cannot be completed.', 400);
        }

        $registrationData = $registration->getData();

        $user = new User();
        $user
            ->setFirstName($registrationData[2]['firstName'])
            ->setLastName($registrationData[2]['lastName'])
            ->setEmail($registrationData[2]['email'])
            ->setPhone($registrationData[2]['phone'])
            ->setPassword(
                $this->passwordHasher->hashPassword(
                    $user, $registrationData[3]['password']
                )
            )
            ->setIsActive(false)
            ->setIsInstitution(true)
        ;

        if ($role = $this->roleRepository->getByCode('INSTITUTION')) {
            $user->addRole($role);
        }

        $this->userRepo->save($user);

        // Send email to manager
        $this->mailerService->sendTplEmail(
            subject: 'Реєстрація нового медзакладу',
            tpl: '/mail/new_institution_register_api.html.twig',
            tplParams: ['registrationData' => $registrationData],
        );

        $this->registrationRepos->remove($registration);

        $this->authorizationType->setUser($user);

        return $this->authorizationType;
    }
}

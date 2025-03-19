<?php

namespace App\Controller;

use App\Form\InstitutionRegistrationFormType;
use App\Form\InstituitionRegister\Step1Type;
use App\Form\InstituitionRegister\Step2Type;
use App\Form\InstituitionRegister\Step3Type;
use App\Form\UserRegistrationFormType;
use App\Security\LoginFormAuthenticator;
use SoftUa\UserBundle\Entity\User;
use SoftUa\UserBundle\Repository\RoleRepository;
use SoftUa\UserBundle\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Authentication\UserAuthenticatorInterface;
use App\Form\Model\MultiStepFormModel;
use App\Components\ApiResponse;
use App\Service\MailerService;
use Symfony\Component\Form\Form;

class RegistrationController extends AbstractController
{
    public function __construct(
        private readonly UserRepository $userRepository,
        private readonly RoleRepository $roleRepository,
        private readonly MailerService $mailerService,
    ) { }

    #[Route('/registration/', 'registration_page')]
    public function registration(): Response
    {
        return $this->render('registration/register.html.twig');
    }

    #[Route('/registration/institution', 'institution_registration_page')]
    public function institutionRegistration(
        Request $request,
        SessionInterface $session,
        UserPasswordHasherInterface $passwordHasher,
    ): Response
    {
        $user = new User();

        $formData = $session->get('institution_register_form', new MultiStepFormModel());

        $step = (int) $request->query->get('step', 1);

        $formType = $this->getFormTypeForStep($step);
        $currentStepData = $this->getStepData($formData, $step);

        $form = $this->createForm($formType, $currentStepData);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            if ($step == 1) {
                $formData->step1Data = $form->getData();
                $session->set('institution_register_form', $formData);

                $form = $this->createForm(Step2Type::class, $formData->step2Data);

                $formHtml = $this->render("form/institution_register/multi_step_form.html.twig", [
                    'form' => $form->createView(),
                    'step' => 2,
                ])->getContent();

                return (new ApiResponse)->setData(['html' => $formHtml]);
            } elseif ($step == 2) {
                $formData->step2Data = $form->getData();
                $session->set('institution_register_form', $formData);

                $form = $this->createForm(Step3Type::class, $formData->step3Data);

                $formHtml = $this->render("form/institution_register/multi_step_form.html.twig", [
                    'form' => $form->createView(),
                    'step' => 3,
                ])->getContent();

                return (new ApiResponse)->setData(['html' => $formHtml]);
            } elseif ($step == 3) {
                if (!$formData || (!empty($formData->step1Data) && !empty($formData->step2Data))) {
                    if (empty($formData->step1Data)) {
                        return (new ApiResponse())
                        ->setResult(false)
                        ->addErrors(['0' => 'Крок 1 не пройдений']);
                    }
                    if (empty($formData->step2Data)) {
                        return (new ApiResponse())
                        ->setResult(false)
                        ->addErrors(['0' => 'Крок 2 не пройдений']);
                    }
                }

                $formData->step3Data = $form->getData();

                $session->set('institution_register_form', $formData);

                $user->setPassword(
                    $passwordHasher->hashPassword(
                        $user, $form->get('plain_password')->getData()
                        )
                    );
                    
                $user->setIsActive(false);
                $user->setIsInstitution(true);
                    
                if ($role = $this->roleRepository->getByCode('INSTITUTION')) {
                    $user->addRole($role);
                }
                    
                $user->setFirstName($formData->step2Data['firstName']);
                $user->setLastName($formData->step2Data['lastName']);
                $user->setEmail($formData->step2Data['email']);
                $user->setPhone($formData->step2Data['phone']);
                
                $this->userRepository->save($user);
                
                $this->mailerService->sendTplEmail(
                    subject: 'Реєстрація нового медзакладу',
                    tpl: '/mail/new_institution_register.html.twig',
                    tplParams: ['formData' => $formData],
                );
                
                $session->set('is_registered', true);

                return (new ApiResponse)->setRedirectUrl($this->redirectToRoute('registration_success_page')->getTargetUrl());
            }
        }

        if ($request->isXmlHttpRequest()) {

            $errors = $this->getFormErrors($form);

            return (new ApiResponse())
                ->setResult(false)
                ->addErrors($errors);
        }

        return $this->render('registration/institution_register.html.twig', [
            'form' => $form->createView(),
            'step' => $step,
        ]);
    }

    #[Route('/registration/success/', 'registration_success_page')]
    public function registrationSuccess(
        SessionInterface $session,
    ): Response
    {
        if (!$session->get('is_registered')) {
            return $this->redirectToRoute('home');
        }

        $session->remove('institution_register_form');

        return $this->render('registration/register_success.html.twig');
    }

    #[Route('/registration/user/', 'user_registration_page')]
    public function userRegistration(
        Request $request,
        UserPasswordHasherInterface $passwordHasher,
        UserAuthenticatorInterface $userAuthenticator,
        LoginFormAuthenticator $authenticator
    ): Response
    {
        $user = new User();
        $form = $this->createForm(UserRegistrationFormType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // Encode the password
            $user->setPassword(
                $passwordHasher->hashPassword(
                    $user, $form->get('password')->getData()
                )
            );

            // Save the new user
            $this->userRepository->save($user);

            // Automatically log them in
            $userAuthenticator->authenticateUser(
                $user,
                $authenticator,
                $request
            );

            return (new ApiResponse)->setRedirectUrl($this->redirectToRoute('home')->getTargetUrl());
        }

        if ($request->isXmlHttpRequest()) {

            $errors = $this->getFormErrors($form);

            return (new ApiResponse())
                ->setResult(false)
                ->addErrors($errors);
        }

        return $this->render('registration/user_register.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    public function complete(SessionInterface $session): Response
    {
        $formData = $session->get('multi_step_form');

        if (!$formData) {
            return $this->redirectToRoute('multi_step_form', ['step' => 1]);
        }

        // Очистити сесію після завершення
        $session->remove('multi_step_form');

        return $this->render('form/complete.html.twig', [
            'formData' => $formData,
        ]);
    }

    // Duplicate from ResetPasswordController
    private function getFormErrors(Form $form) {
        $errors = [];

        foreach ($form->getErrors(true, false) as $error) {
            if (!$error->hasChildren()) {
                $errors[$error->current()->getOrigin()->getName()] = $error->current()->getMessage();
            } else {
                // for RepeatedType errors
                $errorName = $error->getForm()->getName() . '_' . $error->current()->current()->getOrigin()->getName();
                $errors[$errorName] = $error->current()->current()->getMessage();
            }
        }

        return $errors;
    }

    private function getFormTypeForStep(int $step): string
    {
        return match ($step) {
            1 => Step1Type::class,
            2 => Step2Type::class,
            3 => Step3Type::class,
            default => throw new \InvalidArgumentException('Invalid step'),
        };
    }

    private function getStepData(MultiStepFormModel $multiStepData, int $step)
    {
        return match ($step) {
            1 => $multiStepData->step1Data,
            2 => $multiStepData->step2Data,
            3 => $multiStepData->step3Data,
            default => throw new \InvalidArgumentException('Invalid step'),
        };
    }
}
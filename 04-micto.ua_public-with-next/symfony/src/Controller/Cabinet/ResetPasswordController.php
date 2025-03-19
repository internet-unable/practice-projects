<?php

namespace App\Controller\Cabinet;

use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use SoftUa\UserBundle\Exceptions\ConfirmationCompletedException;
use SoftUa\UserBundle\Exceptions\ConfirmationExpiredException;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Form\Form;
use Symfony\Component\Form\FormError;
use Symfony\Component\Form\FormErrorIterator;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Contracts\Translation\TranslatorInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use SoftUa\UserBundle\Repository\UserRepository;
use SoftUa\UserBundle\Repository\UserDataConfirmationRepository;
use App\Controller\Cabinet\Form\ResetPasswordRequestForm;
use App\Controller\Cabinet\Form\ChangePasswordForm;
use App\Components\ApiResponse;

class ResetPasswordController extends AbstractController
{
    public function __construct(
        private readonly UserRepository $userRepository,
        private readonly TranslatorInterface $translator,
        private readonly UserDataConfirmationRepository $confirmationRepo,
        private readonly UserPasswordHasherInterface $passwordHasher,
        private readonly Security $security,
    ) {}

    #[Route('/auth/reset-request', name: 'reset_password_request_page')]
    public function index(Request $request): Response
    {
        $form = $this->createForm(ResetPasswordRequestForm::class);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $username = $form->get('username')->getData();

            $user = $this->userRepository->getByLogin($username);

            $this->confirmationRepo->createChangePasswordConfirmation($user);

            return (new ApiResponse())->setData(['userEmail' => $username]);
        }
        
        if ($request->isXmlHttpRequest()) {

            $errors = $this->getFormErrors($form);

            return (new ApiResponse())
                ->setResult(false)
                ->addErrors($errors);
        }

        return $this->render('cabinet/pass_reset/reset_password_request_page.html.twig', [
            'form' => $form->createView(),
        ]);
    }


    #[Route('/auth/change-password/{code}', name: 'change_password_page')]
    public function resetPasswordPage(Request $request, string $code): Response
    {
        $confirmation = $this->confirmationRepo->getByPublicKey($code);

        if (!$confirmation) {
            throw new NotFoundHttpException('Page not found');
        }

        $form = $this->createForm(ChangePasswordForm::class);
        
        if ($confirmation->isCompleted()) {
            return $this->render('cabinet/pass_reset/change_password_page.html.twig', [
                'isCompleted' => true,
            ]);
        }
        
        $form->handleRequest($request);

        // Немає перевірки чи вийшов час для цього запиту, сторінка рендириться завжди якщо перейти за коректим посиланням.
        // Можливо додати в $confirmation метод який це перевіряє (created_at + час з класу порівняти з часом зараз)?

        if ($form->isSubmitted() && $form->isValid()) {
            $response = new ApiResponse();
            
            $plainPassword = $form->get('plain_password')->getData();
            $user = $confirmation->getuser();

            $confirmation->setNewValue(
                $this->passwordHasher->hashPassword($user, $plainPassword)
            );

            try {
                $this->confirmationRepo->applyChangePasswordConfirmation($confirmation);
            } catch (ConfirmationCompletedException $e) {
                return $response->setData(['message' => $e->getMessage()]);
            } catch (ConfirmationExpiredException $e) {
                return $response->addError($e->getMessage());
            }

            return $response->setData(['completed' => true]);
        }
        
        if ($request->isXmlHttpRequest()) {

            $errors = $this->getFormErrors($form);

            return (new ApiResponse())
                ->setResult(false)
                ->addErrors($errors);
        }

        return $this->render('cabinet/pass_reset/change_password_page.html.twig', [
            'form' => $form->createView(),
            'email' => $confirmation->getUser()->getEmail(),
            'code' => $code,
        ]);
    }


    // Є сенс зробити одну функцію для інших форм, для збереження структури відповідей
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
}

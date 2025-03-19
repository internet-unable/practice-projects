<?php

namespace App\Controller\User;

use SoftUa\UserBundle\Entity\User;
use SoftUa\UserBundle\Exceptions\ConfirmationCompletedException;
use SoftUa\UserBundle\Exceptions\ConfirmationExpiredException;
use SoftUa\UserBundle\Repository\UserDataConfirmationRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;

class ChangeEmailFinalizeController extends AbstractController
{
    public function __construct(
        private readonly UserDataConfirmationRepository $confirmationRepo,
        private readonly Security $security,
    ) {}

    #[Route('/change-email/{code}/', 'confirm_email_change')]
    public function changeEmail(string $code): Response
    {
        if (!$confirmation = $this->confirmationRepo->getByPublicKey($code)) {
            throw new NotFoundHttpException('Page not found');
        }

        $user = $this->security->getUser();

        if (
            $user instanceof User
            && $user->getId() != $confirmation->getUser()->getId()
        ) {
            throw new AccessDeniedHttpException('Access denied');
        }

        $isSuccess = false;
        $isExpired = false;
        $isCompleted = $confirmation->isCompleted();

        try {
            $this->confirmationRepo->applyChangeEmailConfirmation($confirmation);
            $isSuccess = $confirmation->isCompleted();
            $this->security->logout(false);
        } catch (ConfirmationCompletedException) {
            $isCompleted = true;
        } catch (ConfirmationExpiredException) {
            $isExpired = true;
        }

        return $this->render('confirmation/change_email.html.twig', [
            'isSuccess' => $isSuccess,
            'isExpired' => $isExpired,
            'isCompleted' => $isCompleted,
        ]);
    }
}

<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Form\CreateInstitutionRequestFormType;
use App\Entity\Institution\OwnershipForm;
use App\Entity\CommentType;

use App\Repository\CommentRepository;

class TestMailController extends AbstractController
{
    public function __construct(
        private readonly CommentRepository $commentRepo,
    ) {
        
    }

    #[Route('/mail/new_comment_public', name: 'mail_test_new_comment')]
    public function testMailNewCommentPublic(Request $request): Response
    {
        $testData = [
            'userType' => 'visitor',
            // 'contacts' => '',
            // 'agreeTerms' => '',
            'fullName' => 'test full name',
            'shortName' => 'test short name',
            'institutionType' => 'Type: Діагностичний центр',
            'ownershipForm' => OwnershipForm::STATE,
            'address' => 'address: 04107, вул. Татарська 38, м. Київ, Київська обл',
            'chiefFullName' => 'chiefFullName test',
            'headDoctorFullName' => 'headDoctorFullName test',
            'phones' => 'phones test',
            'email' => 'email test',
            'schedule' => 'schedule test',
            'edrpou' => 'edrpou test',
            'institutionStatus' => 'relocated',
        ];

        $form = $this->createForm(CreateInstitutionRequestFormType::class, $testData);

        return $this->render('mail/public/comment_published.html.twig', [
            'form' => $form->createView(),
            'url' => 'test_url',
            'comment' => [
                'id' => '1',
                'name' => 'test commnent name',
                'text' => 'test commnent text',
                'type' => CommentType::COMPLAINT,
            ],
            'email' => [
                'subject' => 'Додано новий коментар',
            ],
        ]);
    }

    #[Route('/mail/test/new_comment', name: 'mail_test_new_comment_admin')]
    public function testMailNewComment(Request $request): Response
    {
        $testData = [
            'userType' => 'visitor',
            // 'contacts' => '',
            // 'agreeTerms' => '',
            'fullName' => 'test full name',
            'shortName' => 'test short name',
            'institutionType' => 'Type: Діагностичний центр',
            'ownershipForm' => OwnershipForm::STATE,
            'address' => 'address: 04107, вул. Татарська 38, м. Київ, Київська обл',
            'chiefFullName' => 'chiefFullName test',
            'headDoctorFullName' => 'headDoctorFullName test',
            'phones' => 'phones test',
            'email' => 'email test',
            'schedule' => 'schedule test',
            'edrpou' => 'edrpou test',
            'institutionStatus' => 'relocated',
        ];

        $form = $this->createForm(CreateInstitutionRequestFormType::class, $testData);

        return $this->render('mail/new_comment.html.twig', [
            'form' => $form->createView(),
            'adminUrl' => 'test_url',
            'comment' => [
                'id' => '1',
                'name' => 'test commnent name',
                'text' => 'test commnent text',
                'type' => CommentType::COMPLAINT,
            ],
            'email' => [
                'subject' => 'Додано новий коментар',
            ],
        ]);
    }

    #[Route('/mail/new_comment_i', name: 'mail_test_new_comment_admin_i')]
    public function testMailNewCommentI(Request $request): Response
    {
        $testData = [
            'userType' => 'visitor',
            // 'contacts' => '',
            // 'agreeTerms' => '',
            'fullName' => 'test full name',
            'shortName' => 'test short name',
            'institutionType' => 'Type: Діагностичний центр',
            'ownershipForm' => OwnershipForm::STATE,
            'address' => 'address: 04107, вул. Татарська 38, м. Київ, Київська обл',
            'chiefFullName' => 'chiefFullName test',
            'headDoctorFullName' => 'headDoctorFullName test',
            'phones' => 'phones test',
            'email' => 'email test',
            'schedule' => 'schedule test',
            'edrpou' => 'edrpou test',
            'institutionStatus' => 'relocated',
        ];

        $form = $this->createForm(CreateInstitutionRequestFormType::class, $testData);

        return $this->render('mail/public/institution_new_comment.html.twig', [
            'form' => $form->createView(),
            'adminUrl' => 'test_url',
            'comment' => [
                'id' => '1',
                'name' => 'test commnent name',
                'text' => 'test commnent text',
                'type' => CommentType::COMPLAINT,
            ],
            'url' => '',
            'email' => [
                'subject' => 'Додано новий коментар',
            ],
        ]);
    }

    #[Route('/mail/test/reply', name: 'mail_test_reply')]
    public function testMailReply(Request $request): Response
    {
        $testData = [
            'userType' => 'visitor',
            // 'contacts' => '',
            // 'agreeTerms' => '',
            'fullName' => 'test full name',
            'shortName' => 'test short name',
            'institutionType' => 'Type: Діагностичний центр',
            'ownershipForm' => OwnershipForm::STATE,
            'address' => 'address: 04107, вул. Татарська 38, м. Київ, Київська обл',
            'chiefFullName' => 'chiefFullName test',
            'headDoctorFullName' => 'headDoctorFullName test',
            'phones' => 'phones test',
            'email' => 'email test',
            'schedule' => 'schedule test',
            'edrpou' => 'edrpou test',
            'institutionStatus' => 'relocated',
        ];

        $form = $this->createForm(CreateInstitutionRequestFormType::class, $testData);

        $comment = $this->commentRepo->getById(10041);

        return $this->render('mail/public/comment_reply.html.twig', [
            'form' => $form->createView(),
            'url' => 'test_url',
            'comment' => $comment,
            'email' => [
                'subject' => 'Додано новий коментар',
            ],
        ]);
    }

    #[Route('/mail/pass-change', name: 'mail_test_pass_change')]
    public function testMailPassChange(Request $request): Response
    {
        $testData = [
            'userType' => 'visitor',
            // 'contacts' => '',
            // 'agreeTerms' => '',
            'fullName' => 'test full name',
            'shortName' => 'test short name',
            'institutionType' => 'Type: Діагностичний центр',
            'ownershipForm' => OwnershipForm::STATE,
            'address' => 'address: 04107, вул. Татарська 38, м. Київ, Київська обл',
            'chiefFullName' => 'chiefFullName test',
            'headDoctorFullName' => 'headDoctorFullName test',
            'phones' => 'phones test',
            'email' => 'email test',
            'schedule' => 'schedule test',
            'edrpou' => 'edrpou test',
            'institutionStatus' => 'relocated',
        ];

        $form = $this->createForm(CreateInstitutionRequestFormType::class, $testData);

        $comment = $this->commentRepo->getById(10041);

        return $this->render('mail/public/confirmation_of_password_change.html.twig', [
            'url' => 'testLink',
            'email' => [
                'subject' => 'subject'
            ],
        ]);
    }
}

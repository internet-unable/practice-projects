<?php

namespace App\GraphQL\Institution\Mutation;

use App\GraphQL\Common\Validator\InputValidator;
use App\GraphQL\Institution\Input\CreateInstitutionRequestInput;
use App\Service\MailerService;
use TheCodingMachine\GraphQLite\Annotations\Mutation;

class CreateInstitutionRequestMutation
{
    public function __construct(
        private readonly MailerService $mailerService,
        private readonly InputValidator $validator,
    ){}

    #[Mutation]
    public function sendCreateInstitutionRequest(CreateInstitutionRequestInput $input): bool
    {
        $this->validator->validate($input);

        $this->mailerService->sendTplEmail(
            subject: 'Запит на додавання мед. закладу',
            tpl: '/mail/new_institution.html.twig',
            tplParams: ['formData' => $input->toArray()]
        );

        return true;
    }
}

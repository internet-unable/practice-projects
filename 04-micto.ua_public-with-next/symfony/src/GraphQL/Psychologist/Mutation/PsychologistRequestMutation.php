<?php

namespace App\GraphQL\Psychologist\Mutation;

use App\GraphQL\Common\Validator\InputValidator;
use App\GraphQL\Psychologist\Input\PsychologistRequestInput;
use App\Service\MailerService;
use TheCodingMachine\GraphQLite\Annotations\Mutation;

class PsychologistRequestMutation
{
    public function __construct(
        private readonly MailerService $mailerService,
        private readonly InputValidator $validator,
    ) {}

    #[Mutation]
    public function sendPsychologistRequest(PsychologistRequestInput $input): bool
    {
        $this->validator->validate($input);

        $this->mailerService->sendTplEmail(
            subject: 'Психолог. Запит на прийом',
            tpl: '/mail/psychologist_request.html.twig',
            tplParams: ['formData' => [
                'name' => $input->name,
                'phone' => $input->phone,
                'comment' => $input->comment,
            ]]
        );

        return true;
    }
}

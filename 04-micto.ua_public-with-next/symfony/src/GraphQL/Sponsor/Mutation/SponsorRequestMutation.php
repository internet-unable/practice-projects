<?php

namespace App\GraphQL\Sponsor\Mutation;

use App\GraphQL\Common\Validator\InputValidator;
use App\GraphQL\Sponsor\Input\SponsorRequestInput;
use App\Service\MailerService;
use TheCodingMachine\GraphQLite\Annotations\Mutation;

class SponsorRequestMutation
{
    public function __construct(
        private readonly MailerService $mailerService,
        private readonly InputValidator $validator,
    ) {}

    #[Mutation]
    public function sendSponsorRequest(SponsorRequestInput $input): bool
    {
        $this->validator->validate($input);

        $this->mailerService->sendTplEmail(
            subject: 'Запит спонсора',
            tpl: '/mail/sponsor_request.html.twig',
            tplParams: ['formData' => [
                'name' => $input->name,
                'phone' => $input->phone,
                'email' => $input->email,
                'comment' => $input->comment,
            ]]
        );

        return true;
    }
}

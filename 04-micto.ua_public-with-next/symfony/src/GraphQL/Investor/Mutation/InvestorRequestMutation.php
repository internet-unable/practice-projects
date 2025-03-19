<?php

namespace App\GraphQL\Investor\Mutation;

use App\GraphQL\Common\Validator\InputValidator;
use App\GraphQL\Investor\Input\InvestorRequestInput;
use App\Service\MailerService;
use TheCodingMachine\GraphQLite\Annotations\Mutation;

class InvestorRequestMutation
{
    public function __construct(
        private readonly MailerService $mailerService,
        private readonly InputValidator $validator,
    ) {}

    #[Mutation]
    public function sendInvestorRequest(InvestorRequestInput $input): bool
    {
        $this->validator->validate($input);

        $this->mailerService->sendTplEmail(
            subject: 'Запит інвестора',
            tpl: '/mail/investor_request.html.twig',
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

<?php

namespace App\GraphQL\Notification\Query;

use App\GraphQL\Common\Pagination\PaginationInput;
use App\GraphQL\Notification\Input\UserNotificationFilterInput;
use App\GraphQL\Notification\Type\UserNotificationList;
use App\Repository\Notification\UserNotificationRepository;
use SoftUa\UserBundle\Entity\User;
use TheCodingMachine\GraphQLite\Annotations\InjectUser;
use TheCodingMachine\GraphQLite\Annotations\Logged;
use TheCodingMachine\GraphQLite\Annotations\Query;

class UserNotificationQuery
{
    public function __construct(
        private readonly UserNotificationRepository $userNotificationRepo,
    ){}

    #[Query]
    #[Logged]
    public function myNotifications(
        #[InjectUser]
        User $user,
        ?UserNotificationFilterInput $filter = null,
        ?PaginationInput $pagination = null
    ): ?UserNotificationList
    {
        $notificationFilter = [
            'dateFrom' => $filter?->dateFrom,
            'dateTo' => $filter?->dateTo,
            'onlyUnread' => $filter?->onlyUnread,
        ];

        $query = $this->userNotificationRepo->getUserNotificationsQuery(
            $user->getId(),
            $notificationFilter
        );

        return new UserNotificationList($query, $pagination);
    }
}

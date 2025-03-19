<?php

namespace App\Entity\Notification;

enum NotificationType: string
{
    case COMMENT = 'comment';
    case COMMENT_REPLY = 'comment_reply';
    case SYSTEM = 'system';
}

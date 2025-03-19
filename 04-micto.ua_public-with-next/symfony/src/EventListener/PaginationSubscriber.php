<?php

namespace App\EventListener;

use Knp\Component\Pager\Event\ItemsEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class PaginationSubscriber implements EventSubscriberInterface
{
    /**
     * {@inheritdoc}
     */
    public static function getSubscribedEvents(): array
    {
        return [
            'knp_pager.items' => ['items', 1]
        ];
    }

    public function items(ItemsEvent $event): void
    {
        $query = $event->target;

        if(!is_array($query) || !empty($query)){
            return;
        }

        $event->count = $event->options['totalCount'];
        $event->items = [];
        $event->stopPropagation();
    }
}

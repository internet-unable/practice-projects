<?php

namespace App\GraphQL\Schedule\Service;

use App\Entity\Schedule\Schedule;
use App\GraphQL\Schedule\Input\ScheduleItemInputType;
use App\GraphQL\Schedule\Transformer\ScheduleTransformer;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\EntityManagerInterface;

/**
 * @param Collection<Schedule> $oldItems
 * @param Collection<ScheduleItemInputType> $newItems
 * @return Collection
 */
class ScheduleService
{
    public function __construct(
        private readonly ScheduleTransformer $scheduleTransformer,
        private readonly EntityManagerInterface $em,
    ){}

    public function diffSchedules(
        Collection $oldItems,
        Collection $newItems,
        string $entityClass,
    ): Collection
    {
        // Create a map of new items by dayOfWeek for quick lookup
        $newItemsMap = [];
        foreach ($newItems as $newItem) {
            $newItemsMap[$newItem->dayOfWeek->name] = $this->scheduleTransformer->fromInput($newItem, $entityClass);
        }

        // Iterate over old items to update existing or remove non-existing items
        foreach ($oldItems as $key => $oldItem) {
            $dayOfWeek = $oldItem->getDayOfWeek();
            if (isset($newItemsMap[$dayOfWeek->name])) {
                // Update the old item with values from the new item
                $newItem = $newItemsMap[$dayOfWeek->name];

                // Assume there are methods to set other fields from $newItem to $oldItem
                $oldItem->setStartTime($newItem->getStartTime());
                $oldItem->setEndTime($newItem->getEndTime());
                $oldItem->setIsHoliday($newItem->isHoliday());
                $oldItem->setIsAroundTheClock($newItem->isAroundTheClock());

                // Remove it from map as it's already processed
                unset($newItemsMap[$dayOfWeek->name]);
            } else {
                // Remove old item if it's not in the new items
                $this->em->remove($oldItem);
                $oldItems->remove($key);
            }
        }

        // Add remaining new items to the old items collection
        foreach ($newItemsMap as $newItem) {
            $oldItems->add($newItem);
        }

        return $oldItems;
    }
}

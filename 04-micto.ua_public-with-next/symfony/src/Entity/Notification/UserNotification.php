<?php

namespace App\Entity\Notification;

use App\Entity\AbstractEntity;
use App\Repository\Notification\UserNotificationRepository;
use DateTime;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use SoftUa\UserBundle\Entity\User;

#[ORM\Entity(repositoryClass: UserNotificationRepository::class)]
#[ORM\Table('user_notifications')]
#[ORM\Index(columns:['is_read'], name:'is_read_idx')]
#[ORM\Index(columns:['created_at'], name:'created_at_idx')]
#[ORM\Index(columns:['notification_id'], name:'notification_idx')]
#[ORM\Index(columns:['user_id'], name:'user_idx')]
class UserNotification extends AbstractEntity
{
    #[ORM\ManyToOne(targetEntity: Notification::class, inversedBy: 'userNotifications')]
    #[ORM\JoinColumn('notification_id', nullable: false, onDelete: 'CASCADE')]
    private Notification $notification;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn('user_id', nullable: false, onDelete: 'CASCADE')]
    private User $user;

    #[ORM\Column('is_read', options: ['default' => false])]
    private bool $isRead = false;

    #[ORM\Column('read_at', type: Types::DATETIME_MUTABLE, nullable: true)]
    protected ?DateTime $readAt = null;

    #[Gedmo\Timestampable(on: 'create')]
    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    protected DateTime $createdAt;

    public function getNotification(): Notification
    {
        return $this->notification;
    }

    public function setNotification(Notification $notification): self
    {
        $this->notification = $notification;

        return $this;
    }

    public function getUser(): User
    {
        return $this->user;
    }

    public function setUser(User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function isRead(): bool
    {
        return $this->isRead;
    }

    public function setIsRead(bool $isRead): self
    {
        $this->isRead = $isRead;

        return $this;
    }

    public function getReadAt(): ?DateTime
    {
        return $this->readAt;
    }

    public function setReadAt(?DateTime $readAt): self
    {
        $this->readAt = $readAt;

        return $this;
    }

    public function getCreatedAt(): DateTime
    {
        return $this->createdAt;
    }

    public function setCreatedAt(DateTime $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }
}

<?php

namespace App\Entity\Notification;

use App\DBAL\Type\NotificationTypeEnumType;
use App\Entity\AbstractEntity;
use App\Entity\Comment;
use App\Repository\Notification\NotificationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Timestampable\Traits\TimestampableEntity;

#[ORM\Entity(repositoryClass: NotificationRepository::class)]
#[ORM\Table('notifications')]
#[ORM\Index(columns:['type'], name:'type_idx')]
#[ORM\Index(columns:['created_at'], name:'created_at_idx')]
#[ORM\Index(columns:['is_sent'], name:'is_sent_idx')]
class Notification extends AbstractEntity
{
    use TimestampableEntity;

    #[ORM\ManyToOne(targetEntity: Comment::class)]
    #[ORM\JoinColumn('comment_id', nullable: true, onDelete: 'CASCADE')]
    private ?Comment $comment;

    #[ORM\Column(type: NotificationTypeEnumType::NAME, enumType: NotificationType::class)]
    private NotificationType $type = NotificationType::COMMENT;

    #[ORM\Column(type: Types::JSON)]
    private array $payload = [];

    #[ORM\Column('is_sent', options: ['default' => false])]
    private bool $isSent = false;

    #[ORM\OneToMany(mappedBy: 'notification', targetEntity: UserNotification::class, orphanRemoval: true)]
    private Collection $userNotifications;

    public function __construct()
    {
        $this->userNotifications = new ArrayCollection();
    }

    public function getComment(): ?Comment
    {
        return $this->comment;
    }

    public function setComment(?Comment $comment): self
    {
        $this->comment = $comment;

        return $this;
    }

    public function getType(): NotificationType
    {
        return $this->type;
    }

    public function setType(NotificationType $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getPayload(): array
    {
        return $this->payload;
    }

    public function setPayload(array $payload): self
    {
        $this->payload = $payload;

        return $this;
    }

    public function isSent(): bool
    {
        return $this->isSent;
    }

    public function setIsSent(bool $isSent): self
    {
        $this->isSent = $isSent;

        return $this;
    }

    /**
     * @return Collection<int, UserNotification>
     */
    public function getUserNotifications(): Collection
    {
        return $this->userNotifications;
    }
}

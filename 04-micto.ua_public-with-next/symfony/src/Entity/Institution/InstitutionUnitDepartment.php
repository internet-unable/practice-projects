<?php

namespace App\Entity\Institution;

use App\Entity\AbstractEntity;
use App\Entity\Comment;
use App\Entity\Schedule\UnitDepartmentSchedule;
use App\Entity\Traits\SluggableEntity;
use App\Entity\UserEntity\UserEntityInterface;
use App\Repository\Institution\InstitutionUnitDepartmentRepository;
use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Timestampable\Traits\TimestampableEntity;

/**
 * Відділення підрозділу. Наприклад, "Дитяче" або "Хірургічне"
 **/
#[ORM\Entity(repositoryClass: InstitutionUnitDepartmentRepository::class)]
#[ORM\Table('institution_unit_departments')]
#[ORM\Index(columns:['unit_id'], name: 'unit_idx')]
#[ORM\Index(columns: ['is_published'], name: 'published_idx')]
#[ORM\Index(columns: ['slug'], name: 'slug_idx')]
class InstitutionUnitDepartment extends AbstractEntity  implements UserEntityInterface
{
    use SluggableEntity;
    use TimestampableEntity;

    #[ORM\Column(length: 255)]
    private string $name;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $fullName = null;

    #[ORM\Column(name: 'is_published', options: ['default'=>true])]
    private bool $isPublished = true;

    #[ORM\Column('number', nullable: true)]
    private ?string $number = null;

    #[ORM\Column('description', type: Types::TEXT, nullable: true)]
    private ?string $description;

    #[ORM\Column('old_id', length: 50, nullable: true, options: ['unsigned'=>true])]
    private ?int $oldId = null;

    #[ORM\Column(type: Types::JSON, nullable: true)]
    private ?array $contacts = [];

    #[ORM\Column('rating', type: Types::DECIMAL, precision: 2, scale: 1, nullable: false)]
    private string $rating = '0';

    #[ORM\Column('rating_updated_at', type: Types::DATETIME_MUTABLE, nullable: true, options: ['default'=>null])]
    protected ?DateTime $ratingUpdatedAt = null;

    #[ORM\ManyToOne(inversedBy: 'departments')]
    #[ORM\JoinColumn('unit_id', nullable: false, onDelete: 'CASCADE')]
    private InstitutionUnit $unit;

    #[ORM\OneToMany(mappedBy: 'institutionUnitDepartment', targetEntity: Comment::class)]
    private Collection $comments;

    #[ORM\OneToMany(mappedBy: 'unitDepartment', targetEntity: UnitDepartmentSchedule::class, cascade: ['persist', 'remove'])]
    private Collection $schedule;

    public function __construct()
    {
        $this->comments = new ArrayCollection();
        $this->schedule = new ArrayCollection();
    }

    public function __toString(): string
    {
        return $this->getName();
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getFullName(): ?string
    {
        return $this->fullName;
    }

    public function setFullName(?string $fullName): self
    {
        $this->fullName = $fullName;

        return $this;
    }

    public function isPublished(): bool
    {
        return $this->isPublished;
    }

    public function setIsPublished(bool $isPublished): self
    {
        $this->isPublished = $isPublished;

        return $this;
    }

    public function getNumber(): ?string
    {
        return $this->number;
    }

    public function setNumber(?string $number): self
    {
        $this->number = $number;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getUnit(): InstitutionUnit
    {
        return $this->unit;
    }

    public function setUnit(InstitutionUnit $unit): self
    {
        $this->unit = $unit;

        return $this;
    }

    public function getOldId(): ?int
    {
        return $this->oldId;
    }

    public function setOldId(?int $oldId): self
    {
        $this->oldId = $oldId;

        return $this;
    }

    public function getRating(): float
    {
        return (float)$this->rating;
    }

    public function setRating(float $rating): self
    {
        $this->rating = (string)$rating;

        return $this;
    }

    public function getRatingUpdatedAt(): ?DateTime
    {
        return $this->ratingUpdatedAt;
    }

    public function setRatingUpdatedAt(?DateTime $ratingUpdatedAt): self
    {
        $this->ratingUpdatedAt = $ratingUpdatedAt;

        return $this;
    }

    public function getContacts(): ?array
    {
        return $this->contacts;
    }

    public function setContacts(?array $contacts): self
    {
        $this->contacts = $contacts;

        return $this;
    }

    public function getEmails(): array
    {
        return $this->contacts['emails'] ?? [];
    }

    public function setEmails(array $emails): self
    {
        $emails = array_filter($emails, fn($row) => !empty($row['email']));

        $this->contacts['emails'] = $emails;

        return $this;
    }

    public function getPhones(): array
    {
        return $this->contacts['phones'] ?? [];
    }

    public function setPhones(array $phones): self
    {
        $phones = array_filter($phones, fn($row) => !empty($row['number']));

        $this->contacts['phones'] = $phones;

        return $this;
    }

    public function getComments(): Collection
    {
        return $this->comments;
    }

    public function getSchedule(): Collection
    {
        return $this->schedule;
    }

    /**
     * @param Collection<UnitDepartmentSchedule> $schedule
     *
     * @return $this
     */
    public function setSchedule(Collection $schedule): self
    {
        // remove elements
        foreach ($this->schedule as $item) {
            if (!$schedule->contains($item)) {
                $this->schedule->removeElement($item);
            }
        }

        // add new elements
        foreach ($schedule as $item) {
            $item->setUnitDepartment($this);

            if (!$this->schedule->contains($item)) {
                $this->schedule->add($item);
            }
        }

        return $this;
    }
}

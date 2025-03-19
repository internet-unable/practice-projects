<?php

namespace App\Entity\Institution;

use App\Entity\AbstractEntity;
use App\Entity\Comment;
use App\Entity\Traits\SluggableEntity;
use App\Entity\UserEntity\UserEntityInterface;
use App\Repository\Institution\InstitutionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use DateTime;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Timestampable\Traits\TimestampableEntity;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Мед. заклад
 * Вказує на організацію, без привʼязки до фізичної адреси
 **/
#[ORM\Entity(repositoryClass: InstitutionRepository::class)]
#[ORM\Table('institutions')]
#[ORM\Index(columns: ['is_published'], name: 'published_idx')]
#[ORM\Index(columns: ['slug'], name: 'slug_idx')]
class Institution extends AbstractEntity implements UserEntityInterface
{
    use SluggableEntity;
    use TimestampableEntity;

    #[Assert\NotBlank(groups: ['create', 'update'])]
    #[ORM\Column('name', length: 255)]
    private string $name;

    #[ORM\Column('full_name', length: 255, nullable: true)]
    private ?string $fullName = null;

    #[ORM\Column('description', type: Types::TEXT, nullable: true)]
    private ?string $description = null;

    #[ORM\Column('ownership_form', type: 'OwnershipFormEnumType', enumType: OwnershipForm::class, options: ['default' => OwnershipForm::STATE])]
    private OwnershipForm $ownershipForm = OwnershipForm::STATE;

    #[ORM\Column('is_published', options: ['default'=>true])]
    private bool $isPublished = true;

    #[ORM\Column(type:'json', nullable: true)]
    private ?array $contacts = [];

    #[ORM\Column('rating', type: Types::DECIMAL, precision: 2, scale: 1, nullable: false)]
    private string $rating = '0';

    #[ORM\Column('rating_updated_at', type: Types::DATETIME_MUTABLE, nullable: true, options: ['default'=>null])]
    protected ?DateTime $ratingUpdatedAt = null;

    #[ORM\Column(name: 'has_several_units', options: ['default'=>false])]
    private bool $hasSeveralUnits = false;

    #[ORM\OneToMany(mappedBy: 'institution', targetEntity: InstitutionUnit::class)]
    private Collection $units;

    #[ORM\OneToMany(mappedBy: 'institution', targetEntity: Comment::class)]
    private Collection $comments;

    public function __construct()
    {
        $this->units = new ArrayCollection();
        $this->comments = new ArrayCollection();
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

    public function setIsPublished(bool $isPublished): void
    {
        $this->isPublished = $isPublished;
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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): void
    {
        $this->description = $description;
    }

    public function getOwnershipForm(): OwnershipForm
    {
        return $this->ownershipForm;
    }

    public function setOwnershipForm(OwnershipForm $ownershipForm): void
    {
        $this->ownershipForm = $ownershipForm;
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

    public function isHasSeveralUnits(): bool
    {
        return $this->hasSeveralUnits;
    }

    public function setHasSeveralUnits(bool $hasSeveralUnits): self
    {
        $this->hasSeveralUnits = $hasSeveralUnits;

        return $this;
    }

    public function getUnits(): Collection
    {
        return $this->units;
    }

    /**
     * @return Collection<int, Comment>
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }
}

<?php

namespace App\Entity;

use App\Entity\Institution\Institution;
use App\Entity\Institution\InstitutionUnit;
use App\Entity\Institution\InstitutionUnitDepartment;
use App\Repository\CommentRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Util\ClassUtils;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Gedmo\Timestampable\Traits\TimestampableEntity;
use RuntimeException;
use SoftUa\UserBundle\Entity\User;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Context\ExecutionContextInterface;
use function Symfony\Component\Translation\t;

#[ORM\Entity(repositoryClass: CommentRepository::class)]
#[ORM\Table('comments')]
#[ORM\Index(columns:['created_at'], name:'created_at_idx')]
#[ORM\Index(columns:['updated_at'], name:'updated_at_idx')]
class Comment extends AbstractEntity
{
    use TimestampableEntity;

    // todo: move to CommentTypeService
    const TYPE_INSTITUTION = 'institution';
    const TYPE_INSTITUTION_UNIT = 'institutionUnit';
    const TYPE_UNIT_DEPARTMENT = 'institutionUnitDepartment';

    /**
     * Comment types
     * Maps relations to classes
     * 'relationName' => Entity::class
     */
    const ENTITY_TYPES = [
        self::TYPE_INSTITUTION => Institution::class,
        self::TYPE_INSTITUTION_UNIT => InstitutionUnit::class,
        self::TYPE_UNIT_DEPARTMENT => InstitutionUnitDepartment::class,
    ];

    #[ORM\Column(
        type: 'CommentEnumType',
        enumType: CommentType::class,
        options: ['default' => CommentType::REVIEW])
    ]
    private CommentType $type = CommentType::REVIEW;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $name = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $email = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $phone = null;

    #[ORM\Column(type: Types::TEXT)]
    private string $text;

    /* Not works
     * #[Assert\When(
        expression: "this.getType() == '".CommentType::REVIEW->value."'",
        constraints: [new Assert\NotBlank()],
    )]*/
    #[ORM\Column(type: Types::SMALLINT, nullable: true, options: ['unsigned'=>true])]
    private ?int $mark = null;

    #[ORM\Column('is_published', options: ['default' => false])]
    private bool $isPublished = false;

    #[ORM\Column('is_admin', options: ['default' => false])]
    private bool $isAdminComment = false;

    #[ORM\Column('is_institution', options: ['default' => false])]
    private bool $isInstitutionComment = false;

    #[ORM\ManyToOne(targetEntity: self::class, inversedBy: 'childItems')]
    #[ORM\JoinColumn('root_id', onDelete: 'CASCADE')]
    private ?Comment $rootItem = null;

    #[ORM\ManyToOne(targetEntity: self::class, inversedBy: 'directChildren')]
    #[ORM\JoinColumn('parent_id', onDelete: 'CASCADE')]
    private ?self $parentItem = null;

    #[ORM\OneToMany(mappedBy: 'rootItem', targetEntity: self::class)]
    private Collection $childItems;

    #[ORM\OneToMany(mappedBy: 'parentItem', targetEntity: self::class)]
    private Collection $directChildren;

    #[ORM\Column('entity_type')]
    private ?string $entityType = null;

    #[ORM\ManyToOne(inversedBy: 'comments')]
    #[ORM\JoinColumn('institution_id', nullable: false, onDelete: 'CASCADE')]
    private Institution $institution;

    #[ORM\ManyToOne(inversedBy: 'comments')]
    #[ORM\JoinColumn('institution_unit_id', nullable: true, onDelete: 'CASCADE')]
    private ?InstitutionUnit $institutionUnit = null;

    #[ORM\ManyToOne(inversedBy: 'comments')]
    #[ORM\JoinColumn('institution_unit_department_id', nullable: true, onDelete: 'CASCADE')]
    private ?InstitutionUnitDepartment $institutionUnitDepartment = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn('user_id', nullable: true, onDelete: 'CASCADE')]
    private ?User $user = null;

    #[ORM\Column(type: Types::SMALLINT, length: 4, nullable: true)]
    private ?int $yearOfVisit = null;

    #[ORM\Column(type: Types::SMALLINT, length: 4, nullable: true)]
    private ?int $monthOfVisit = null;

    #[ORM\Column('num_likes', type: Types::INTEGER, options:['default'=>0])]
    private int $numLikes = 0;

    #[ORM\Column('num_dislikes', type: Types::INTEGER, options:['default'=>0])]
    private int $numDislikes = 0;

    #[Gedmo\Timestampable(on: 'create')]
    #[ORM\Column(type: Types::DATETIME_MUTABLE, options:['default'=>'CURRENT_TIMESTAMP'])]
    protected $createdAt;

    #[Gedmo\Timestampable(on: 'update')]
    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true, options: ['default'=>null])]
    protected $updatedAt;

    #[ORM\Column('old_id', nullable: true)]
    private ?int $oldId = null;

    #[ORM\Column('is_notification_sent', options: ['default' => false])]
    private bool $isNotificationSent = false;

    public function __construct()
    {
        $this->childItems = new ArrayCollection();
    }

    public function getType(): CommentType
    {
        return $this->type;
    }

    public function setType(CommentType $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(?string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(?string $phone): static
    {
        $this->phone = $phone;

        return $this;
    }

    public function getText(): string
    {
        return $this->text;
    }

    public function setText(string $text): static
    {
        $this->text = $text;

        return $this;
    }

    public function getMark(): ?int
    {
        return $this->mark;
    }

    public function setMark(?int $mark): static
    {
        $this->mark = $mark;

        return $this;
    }

    public function getParentItem(): ?self
    {
        return $this->parentItem;
    }

    public function setParentItem(?self $parentItem): static
    {
        $this->parentItem = $parentItem;

        return $this;
    }

    public function isPublished(): bool
    {
        return $this->isPublished;
    }

    public function setIsPublished(bool $isPublished): static
    {
        $this->isPublished = $isPublished;

        return $this;
    }

    public function isAdminComment(): bool
    {
        return $this->isAdminComment;
    }

    public function setIsAdminComment(bool $isAdminComment): static
    {
        $this->isAdminComment = $isAdminComment;

        return $this;
    }

    public function isInstitutionComment(): bool
    {
        return $this->isInstitutionComment;
    }

    public function setIsInstitutionComment(bool $isInstitutionComment): static
    {
        $this->isInstitutionComment = $isInstitutionComment;

        return $this;
    }

    public function getRootItem(): ?Comment
    {
        return $this->rootItem;
    }

    public function setRootItem(?Comment $rootItem): self
    {
        $this->rootItem = $rootItem;

        return $this;
    }

    public function getEntityType(): string
    {
        return $this->entityType;
    }

    public function setEntityType(string $entityType): self
    {
        $this->entityType = $entityType;

        return $this;
    }

    public function getInstitution(): Institution
    {
        return $this->institution;
    }

    public function setInstitution(Institution $institution): self
    {
        $this->institution = $institution;

        return $this;
    }

    public function getInstitutionUnit(): ?InstitutionUnit
    {
        return $this->institutionUnit;
    }

    public function setInstitutionUnit(?InstitutionUnit $institutionUnit): self
    {
        $this->institutionUnit = $institutionUnit;
        $this->setInstitution($institutionUnit->getInstitution());

        return $this;
    }

    public function getInstitutionUnitDepartment(): ?InstitutionUnitDepartment
    {
        return $this->institutionUnitDepartment;
    }

    public function setInstitutionUnitDepartment(?InstitutionUnitDepartment $institutionUnitDepartment): self
    {
        $this->institutionUnitDepartment = $institutionUnitDepartment;
        $this->setInstitutionUnit($institutionUnitDepartment->getUnit());

        return $this;
    }

    /**
     * @return Collection<int, self>
     */
    public function getChildItems(): Collection
    {
        return $this->childItems;
    }

    public function addComment(self $comment): static
    {
        if (!$this->childItems->contains($comment)) {
            $this->childItems->add($comment);
            $comment->setParentItem($this);
        }

        return $this;
    }

    public function removeComment(self $comment): static
    {
        if ($this->childItems->removeElement($comment)) {
            // set the owning side to null (unless already changed)
            if ($comment->getParentItem() === $this) {
                $comment->setParentItem(null);
            }
        }

        return $this;
    }

    #[Assert\Callback] // todo: find a way to do this in the EA form
    public function validate(ExecutionContextInterface $context, $payload): void
    {
        if (in_array($this->type, [CommentType::REVIEW, CommentType::COMPLAINT, CommentType::GRATITUDE]) && !$this->mark) {
            $context->buildViolation(t('comment.mark_is_required'))
                ->atPath('mark')
                ->addViolation();
        }
    }

    public function getEntity(): mixed
    {
        return match ($this->entityType) {
            self::TYPE_INSTITUTION => $this->getInstitution(),
            self::TYPE_INSTITUTION_UNIT => $this->getInstitutionUnit(),
            self::TYPE_UNIT_DEPARTMENT => $this->getInstitutionUnitDepartment(),
            default => null,
        };
    }

    public function setEntity(mixed $entity): self
    {
        $class = ClassUtils::getClass($entity);

        if ($entity instanceof Institution) {
            $this->setInstitution($entity);
        } else if ($entity instanceof InstitutionUnit) {
            $this->setInstitutionUnit($entity);
        } else if ($entity instanceof InstitutionUnitDepartment) {
            $this->setInstitutionUnitDepartment($entity);
        } else {
            throw new RuntimeException("Unknown entity class: $class");
        }

        $this->setEntityType(array_flip(self::ENTITY_TYPES)[$class]);

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

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

    public function getYearOfVisit(): ?int
    {
        return $this->yearOfVisit;
    }

    public function setYearOfVisit(?int $yearOfVisit): self
    {
        $this->yearOfVisit = $yearOfVisit;

        return $this;
    }

    public function getMonthOfVisit(): ?int
    {
        return $this->monthOfVisit;
    }

    public function setMonthOfVisit(?int $monthOfVisit): self
    {
        $this->monthOfVisit = $monthOfVisit;

        return $this;
    }

    public function getNumLikes(): int
    {
        return $this->numLikes;
    }

    public function setNumLikes(int $numLikes): self
    {
        $this->numLikes = $numLikes;

        return $this;
    }

    public function getNumDislikes(): int
    {
        return $this->numDislikes;
    }

    public function setNumDislikes(int $numDislikes): self
    {
        $this->numDislikes = $numDislikes;

        return $this;
    }

    public function isNotificationSent(): bool
    {
        return $this->isNotificationSent;
    }

    public function setIsNotificationSent(bool $isNotificationSent): self
    {
        $this->isNotificationSent = $isNotificationSent;

        return $this;
    }
}

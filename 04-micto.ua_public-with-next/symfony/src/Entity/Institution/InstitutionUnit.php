<?php

namespace App\Entity\Institution;

use App\Entity\AbstractEntity;
use App\Entity\Address;
use App\Entity\City;
use App\Entity\CityDistrict;
use App\Entity\Comment;
use App\Entity\Schedule\InstitutionUnitSchedule;
use App\Entity\Traits\SluggableEntity;
use App\Entity\UserEntity\UserEntityInterface;
use App\Repository\Institution\InstitutionUnitRepository;
use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Timestampable\Traits\TimestampableEntity;

/**
 * Підрозділ медзакладу. Фізична будівля розташована за реальною адресою
 **/
#[ORM\Entity(repositoryClass: InstitutionUnitRepository::class)]
#[ORM\Table('institution_units')]
#[ORM\Index(columns: ['type_id'], name: 'type_idx')]
#[ORM\Index(columns: ['city_district_id'], name: 'city_district_idx')]
#[ORM\Index(columns: ['city_id'], name: 'city_idx')]
#[ORM\Index(columns: ['institution_id'], name: 'institution_idx')]
#[ORM\Index(columns: ['is_published'], name: 'published_idx')]
#[ORM\Index(columns: ['slug'], name: 'slug_idx')]
class InstitutionUnit extends AbstractEntity  implements UserEntityInterface
{
    use SluggableEntity;
    use TimestampableEntity;

    #[ORM\Column(length: 255)]
    private string $name;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $fullName = null;

    #[ORM\Column('edrpou', length: 8, nullable: true)]
    private ?string $edrpou;

    #[ORM\Column('legal_form', type: 'LegalFormEnumType', nullable: true, enumType: LegalForm::class)]
    private ?LegalForm $legalForm = null;

    #[ORM\Column('description', type: Types::TEXT, nullable: true)]
    private ?string $description;

    #[ORM\Column('rating', type: Types::DECIMAL, precision: 2, scale: 1, nullable: false)]
    private string $rating = '0';

    #[ORM\Column('rating_updated_at', type: Types::DATETIME_MUTABLE, nullable: true, options: ['default'=>null])]
    protected ?DateTime $ratingUpdatedAt = null;

    #[ORM\Column(name: 'is_published', options: ['default'=>true])]
    private bool $isPublished = true;

    #[ORM\Column('old_id', nullable: true, options: ['unsigned'=>true])]
    private ?int $oldId = null;

    #[ORM\Column(type:'json', nullable: true)]
    private ?array $contacts = [];

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $chiefName = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $headDoctorName = null;

    #[ORM\ManyToOne(targetEntity: InstitutionUnitType::class, inversedBy: 'units')]
    #[ORM\JoinColumn('type_id', onDelete: 'SET NULL')]
    private ?InstitutionUnitType $type;

    // TODO: Перенести city та cityDistrict в Address
    #[ORM\ManyToOne(targetEntity: City::class, inversedBy: 'units')]
    #[ORM\JoinColumn('city_id', nullable: false, onDelete: 'CASCADE')]
    private City $city;

    #[ORM\ManyToOne(targetEntity: CityDistrict::class, inversedBy: 'units')]
    #[ORM\JoinColumn('city_district_id', nullable: true, onDelete: 'SET NULL')]
    private ?CityDistrict $cityDistrict;

    #[ORM\ManyToOne(inversedBy: 'units')]
    #[ORM\JoinColumn('institution_id', nullable: false, onDelete: 'CASCADE')]
    private Institution $institution;

    #[ORM\OneToMany(mappedBy: 'unit', targetEntity: InstitutionUnitDepartment::class)]
    private Collection $departments;

    #[ORM\OneToOne(mappedBy: 'unit', targetEntity: Address::class, cascade: ['persist', 'remove'])]
    private ?Address $address = null;

    #[ORM\OneToMany(mappedBy: 'institutionUnit', targetEntity: Comment::class)]
    private Collection $comments;

    #[ORM\OneToMany(
        mappedBy: 'institutionUnit',
        targetEntity: InstitutionUnitSchedule::class,
        cascade: ['persist', 'remove'],
        orphanRemoval: true,
    )]
    private Collection $schedule;

    public function __construct()
    {
        $this->departments = new ArrayCollection();
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

    public function getOldId(): ?int
    {
        return $this->oldId;
    }

    public function setOldId(?int $oldId): void
    {
        $this->oldId = $oldId;
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

    public function getType(): ?InstitutionUnitType
    {
        return $this->type;
    }

    public function setType(?InstitutionUnitType $type): void
    {
        $this->type = $type;
    }

    public function getCity(): City
    {
        return $this->city;
    }

    public function setCity(City $city): void
    {
        $this->city = $city;
    }

    public function isPublished(): bool
    {
        return $this->isPublished;
    }

    public function setIsPublished(bool $isPublished): void
    {
        $this->isPublished = $isPublished;
    }

    public function getEdrpou(): ?string
    {
        return $this->edrpou;
    }

    public function setEdrpou(?string $edrpou): void
    {
        $this->edrpou = $edrpou;
    }

    public function getLegalForm(): ?LegalForm
    {
        return $this->legalForm;
    }

    public function setLegalForm(?LegalForm $legalForm): self
    {
        $this->legalForm = $legalForm;

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

    public function getCityDistrict(): ?CityDistrict
    {
        return $this->cityDistrict;
    }

    public function setCityDistrict(?CityDistrict $cityDistrict): void
    {
        $this->cityDistrict = $cityDistrict;
    }

    public function getInstitution(): Institution
    {
        return $this->institution;
    }

    public function setInstitution(Institution $institution): void
    {
        $this->institution = $institution;
    }

    public function getAddress(): ?Address
    {
        return $this->address;
    }

    public function setAddress(?Address $address): void
    {
        $this->address = $address;
        $this->address?->setUnit($this);
    }

    public function getDepartments(): Collection
    {
        return $this->departments;
    }

    public function getComments(): Collection
    {
        return $this->comments;
    }

    /**
     * @return Collection<InstitutionUnitSchedule>
     */
    public function getSchedule(): Collection
    {
        return $this->schedule;
    }

    /**
     * @param Collection<InstitutionUnitSchedule> $schedule
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
            $item->setInstitutionUnit($this);

            if (!$this->schedule->contains($item)) {
                $this->schedule->add($item);
            }
        }

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

    public function getChiefName(): ?string
    {
        return $this->chiefName;
    }

    public function setChiefName(?string $chiefName): self
    {
        $this->chiefName = $chiefName;

        return $this;
    }

    public function getHeadDoctorName(): ?string
    {
        return $this->headDoctorName;
    }

    public function setHeadDoctorName(?string $headDoctorName): self
    {
        $this->headDoctorName = $headDoctorName;

        return $this;
    }
}

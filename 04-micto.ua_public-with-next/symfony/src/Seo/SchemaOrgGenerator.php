<?php

namespace App\Seo;

use App\Entity\City;
use App\Entity\CommentType;
use App\Entity\Institution\Institution;
use App\Entity\Institution\InstitutionUnit;
use App\Repository\CommentRepository;
use App\Service\Institution\InstitutionUnitUrlGenerator;
use App\Service\TerritorialUnitNameFormatter;
use App\Service\TerritorialUnitUrlGenerator;
use Spatie\SchemaOrg\Graph;
use Spatie\SchemaOrg\Schema;
use Spatie\SchemaOrg\Type;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class SchemaOrgGenerator
{
    private array $schemaList = [];

    public function __construct(
        private readonly UrlGeneratorInterface $generator,
        private readonly TerritorialUnitNameFormatter $tuNameFormatter,
        private readonly TerritorialUnitUrlGenerator $tuUrlGenerator,
        private readonly InstitutionUnitUrlGenerator $unitUrlGenerator,
        private readonly CommentRepository $commentRepo,
        private readonly string $contactEmail
    ) {
        $this->addWebPageSchema();
    }

    public function addSchema(Type $schema)
    {
        $this->schemaList[] = $schema;
    }

    public function addSchemaForUnit(InstitutionUnit $unit)
    {
        $organization = Schema::medicalOrganization()
            ->name($unit->getName())
            ->url($this->unitUrlGenerator->getUrl($unit, true))
            ->address(
                Schema::postalAddress()
                    ->addressLocality($unit->getCity()->getName())
                    ->streetAddress($unit->getAddress()?->getAddress())
                    ->postalCode($unit->getAddress()?->getZipCode())
                    ->addressCountry('UA')
            )
            ->contactPoint(
                Schema::contactPoint()
                    ->telephone($this->getUnitPhones($unit))
                    ->contactType('customer service')
                    ->areaServed('UA')
                    ->availableLanguage('Ukrainian')
            )
        ;

        $reviewTypes = [
            CommentType::GRATITUDE,
            CommentType::COMPLAINT,
            CommentType::REVIEW,
        ];

        $numComments = $this->commentRepo->countCommentsByParams(
            entity: $unit,
            types: $reviewTypes,
            filter: ['onlyWithMark' => true],
        );

        if ($numComments) {
            $organization->aggregateRating(
                Schema::aggregateRating()
                    ->ratingValue($unit->getRating())
                    ->reviewCount($numComments)
                    ->worstRating(0)
                    ->bestRating(5)
            );

            $comments = $this->commentRepo->getCommentsByParams(
                entity: $unit,
                types: $reviewTypes,
                filter: ['onlyWithMark' => true],
                limit: 10
            );

            $reviews = [];

            foreach ($comments as $comment) {
                $review = Schema::review()
                    ->author(
                        Schema::person()->name($comment->getName())
                    )
                    ->datePublished($comment->getCreatedAt()?->format('Y-m-d'))
                    ->reviewBody($comment->getText())
                    ->reviewRating(
                        Schema::rating()->ratingValue($comment->getMark())
                    )
                ;

                $comments = [];

                $replies = $this->commentRepo->getCommentReplies(
                    commentId: $comment->getId(),
                    limit: 3,
                    offset: 0,
                );

                foreach ($replies as $reply) {
                    $comments[] = Schema::comment()
                        ->author(
                            Schema::person()->name($reply->getName())
                        )
                        ->datePublished($reply->getCreatedAt()?->format('Y-m-d'))
                        ->text($reply->getText())
                    ;
                }

                if (!empty($comments)) {
                    $review->comment($comments);
                }

                $reviews[] = $review;
            }

            $organization->review($reviews);
        }

        $this->addSchema($organization);
    }
    
    /**
     * @param City $city
     * @param Institution[] $institutions
     *
     * @return void
     */
    public function addSchemaForCity(City $city, array $institutions)
    {
        $graph = new Graph();

        $place = $graph->place();

        $place
            ->name(sprintf('Медичні установи %s', $this->tuNameFormatter->getName($city)))
            ->url($this->tuUrlGenerator->getUrl($city, true))
            ->description(sprintf(
                'Каталог медичних установ %s з детальною інформацією про послуги, графік роботи, контакти та відгуки.',
                $this->tuNameFormatter->getName($city)
            ))
            ->address(
                Schema::postalAddress()
                    ->addressLocality($city->getName())
                    ->addressCountry('UA')
            )
        ;

        foreach ($institutions as $institution) {
            /** @var InstitutionUnit $unit */
            $unit = $institution->getUnits()->findFirst(function(int $key, InstitutionUnit $unit) use ($city) {
                    return $unit->getCity() === $city;
                }) ?? $institution->getUnits()->first();

            $graph->medicalOrganization('unit'.$institution->getId())
                ->name($institution->getName())
                ->address(
                    Schema::postalAddress()
                        ->addressLocality($city->getName())
                        ->streetAddress($unit->getAddress()?->getAddress())
                        ->addressCountry('UA')
                )
                ->url($this->unitUrlGenerator->getUrl($unit, true))
                ->telephone($this->getUnitPhones($unit))
            ;
        }

        $this->addSchema($graph);
    }

    /**
     * @return Type[]
     */
    public function getList(): array
    {
        return $this->schemaList;
    }

    private function getUnitPhones(InstitutionUnit $unit): null|array|string
    {
        $phones = null;

        if (isset($unit->getContacts()['phones'])) {
            $phones = array_column($unit->getContacts()['phones'], 'number');
            $phones = array_unique($phones);

            $phones = empty($phones) ? null : (count($phones) > 1 ? $phones : current($phones));
        }

        return $phones;
    }

    private function addWebPageSchema()
    {
        $organization = Schema::organization();
        $address = Schema::postalAddress()
            ->addressLocality('Київ')
            ->addressCountry('Україна')
        ;

        $contactPoint = Schema::contactPoint()
            ->email($this->contactEmail)
        ;

        $baseUrl = $this->generator->generate(
            name: 'home',
            referenceType: UrlGeneratorInterface::ABSOLUTE_URL,
        );

        $organization
            ->name('МІСТО.юа')
            ->image(sprintf('%s/img/logo.png', rtrim($baseUrl, '/')))
            ->address($address)
            ->contactPoint($contactPoint)
        ;

        $this->addSchema($organization);
    }
}

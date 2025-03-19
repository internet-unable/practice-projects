<?php

namespace App\GraphQL\Media\Type;

use App\Entity\Media\Media;
use App\Service\Media\MediaService;
use TheCodingMachine\GraphQLite\Annotations\Field;
use TheCodingMachine\GraphQLite\Annotations\SourceField;
use TheCodingMachine\GraphQLite\Annotations\Type;

#[Type(class: Media::class, name: 'Media')]
#[SourceField(name: 'id')]
#[SourceField(name: 'size')]
#[SourceField(name: 'mimeType')]
#[SourceField(name: 'displayOrder')]
class MediaType
{
    public function __construct(
        private readonly MediaService $mediaService
    ) {}

    #[Field(name: 'url')]
    public function getUrl(Media $media): string
    {
        return $this->mediaService->getUrl($media);
    }
}

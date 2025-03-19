<?php

namespace App\Service\Media;

use App\Entity\Institution\Institution;
use App\Entity\Institution\InstitutionUnit;
use App\Entity\Institution\InstitutionUnitDepartment;
use App\Entity\Media\Media;
use App\Repository\MediaRepository;
use Psr\Http\Message\UploadedFileInterface;
use Symfony\Component\Filesystem\Exception\IOExceptionInterface;
use Symfony\Component\Filesystem\Filesystem;

class MediaService
{
    private Filesystem $filesystem;

    public function __construct(
        private readonly MediaRepository $mediaRepository,
        private readonly string $mediaBaseDir,
        private readonly string $mediaBaseUrl,
    ){
        $this->filesystem = new Filesystem();
    }

    public function getUrl(Media $media): string
    {
        return sprintf(
            '%s/%s',
            rtrim($this->mediaBaseUrl, '/'),
            ltrim($media->getPath(), '/')
        );
    }

    /**
     * @throws MediaServiceException
     */
    public function saveGalleryMedia(
        Institution|InstitutionUnit|InstitutionUnitDepartment $entity,
        ?UploadedFileInterface $file,
        bool $removePreviousMedia = true,
    )
    {
        if (!$file) {
            return;
        }

        $entityMedias = $removePreviousMedia ? $this->getGalleryMedia($entity) : [];

        try {
            $imagePath = $this->moveUploadedFile($entity, $file);

            $media = new Media();
            $media
                ->setEntityId($entity->getId())
                ->setEntityType($this->getEntityType($entity))
                ->setPath($imagePath)
                ->setType(Media::TYPE_GALLERY)
                ->setSize((int)$file->getSize())
                ->setMimeType($file->getClientMediaType() ?: '-')
            ;

            $this->mediaRepository->save($media);

            foreach ($entityMedias as $entityMedia) {
                $this->removeMedia($entityMedia);
            }

        } catch (\Exception $exception) {
            throw new MediaServiceException($exception->getMessage(), previous: $exception);
        }
    }

    public function removeMedia(Media $media): void
    {
        $path = sprintf(
            '%s/%s',
            rtrim($this->mediaBaseDir, '/'),
            ltrim($media->getPath(), '/')
        );

        if ($this->filesystem->exists($path)) {
            $this->filesystem->remove($path);
        }

        $this->mediaRepository->remove($media);
    }

    /**
     * @throws MediaServiceException
     */
    public function getGalleryMedia(
        Institution|InstitutionUnit|InstitutionUnitDepartment $entity
    ): array
    {
        $entityType = $this->getEntityType($entity);
        $entityId = $entity->getId();

        return $this->mediaRepository->getForEntityByType($entityId, $entityType, Media::TYPE_GALLERY);
    }

    private function moveUploadedFile(
        Institution|InstitutionUnit|InstitutionUnitDepartment $entity,
        UploadedFileInterface $file
    ): string
    {
        $entityType = $this->getEntityType($entity);
        $extension = strtolower(pathinfo($file->getClientFilename(), PATHINFO_EXTENSION));

        $path = sprintf(
            '/%s/%s/',
            $entityType,
            strtolower(hash('crc32', $entity->getId()))
        );

        $dir = sprintf(
            '%s/%s/',
            rtrim($this->mediaBaseDir, '/'),
            ltrim($path, '/')
        );

        try {
            $this->filesystem->mkdir($dir);

            $fileName = sprintf(
                '%s.%s',
                strtolower(hash('crc32', $entity->getId().rand(0, 1000))),
                $extension
            );

            $file->moveTo($dir.$fileName);

            return $path.$fileName;
        } catch (IOExceptionInterface $exception) {
            throw new MediaServiceException(
                'An error occurred while creating your directory at '.$exception->getPath(),
                0,
                $exception
            );
        }
    }

    /**
     * @throws MediaServiceException
     */
    private function getEntityType($entity): string
    {
        return match(true) {
            $entity instanceof Institution => Media::ENTITY_TYPE_INSTITUTION,
            $entity instanceof InstitutionUnit => Media::ENTITY_TYPE_INSTITUTION_UNIT,
            $entity instanceof InstitutionUnitDepartment => Media::ENTITY_TYPE_UNIT_DEPARTMENT,
            default => throw new MediaServiceException('Incorrect entity type'),
        };
    }
}

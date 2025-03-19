<?php

namespace App\GraphQL\Media\Input;

use Symfony\Component\Validator\Constraints as Assert;
use Psr\Http\Message\UploadedFileInterface;
use Symfony\Component\Validator\Context\ExecutionContextInterface;
use TheCodingMachine\GraphQLite\Annotations\Field;

trait ImageInputTrait
{
    #[Field(description: 'Image file')]
    public ?UploadedFileInterface $image = null;

    #[Assert\Callback]
    public function validateImage(ExecutionContextInterface $context): void
    {
        if ($this->image) {
            $mimeType = $this->image->getClientMediaType();
            $size = $this->image->getSize();

            // Перевірка MIME-типу
            if (!in_array($mimeType, ['image/jpeg', 'image/png', 'image/gif', 'image/webp'], true)) {
                $context->buildViolation('upload.only_image_allowed')
                    ->atPath('image')
                    ->addViolation();
            }

            $maxSizeMb = 3;

            // Перевірка розміру файлу
            if ($size > $maxSizeMb * 1024 * 1024) {
                $context->buildViolation('upload.too_large')
                    ->setParameter('{{ maxSize }}', $maxSizeMb)
                    ->atPath('image')
                    ->addViolation();
            }
        }
    }
}

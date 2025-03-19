<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\DBAL\Types\Types;
use Doctrine\Migrations\AbstractMigration;

final class Version20241001152937 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add is_notification_sent column to comments tables';
    }

    public function up(Schema $schema): void
    {
        $schema
            ->getTable('comments')
            ->addColumn('is_notification_sent', Types::BOOLEAN)
            ->setNotnull(true)
            ->setDefault(false)
        ;
    }

    public function down(Schema $schema): void
    {
        $schema->getTable('comments')->dropColumn('is_notification_sent');
    }
}

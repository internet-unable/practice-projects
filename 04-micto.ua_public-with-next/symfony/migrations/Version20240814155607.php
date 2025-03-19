<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240814155607 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add created_at index to comments tables';
    }

    public function up(Schema $schema): void
    {
        $table = $schema->getTable('comments');
        $table->addIndex(['created_at'], 'created_at_idx');
    }

    public function down(Schema $schema): void
    {
        $schema->getTable('comments')->dropIndex('created_at_idx');
    }
}

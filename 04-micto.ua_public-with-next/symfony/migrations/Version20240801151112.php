<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240801151112 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add rating_updated_at column to institution tables';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE institutions ADD rating_updated_at DATETIME DEFAULT NULL AFTER rating');
        $this->addSql('ALTER TABLE institution_units ADD rating_updated_at DATETIME DEFAULT NULL AFTER rating');
        $this->addSql('ALTER TABLE institution_unit_departments ADD rating_updated_at DATETIME DEFAULT NULL AFTER rating');

        $table = $schema->getTable('comments');
        $table->addIndex(['updated_at'], 'updated_at_idx');
    }

    public function down(Schema $schema): void
    {
        $schema->getTable('institutions')->dropColumn('rating_updated_at');
        $schema->getTable('institution_units')->dropColumn('rating_updated_at');
        $schema->getTable('institution_unit_departments')->dropColumn('rating_updated_at');
        $schema->getTable('comments')->dropIndex('updated_at_idx');
    }
}

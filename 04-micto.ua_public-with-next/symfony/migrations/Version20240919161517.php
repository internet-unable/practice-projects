<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240919161517 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add old_id index to tables';
    }

    public function up(Schema $schema): void
    {
        $schema->getTable('cities')->addIndex(['old_id'], 'old_idx');
        $schema->getTable('areas')->addIndex(['old_id'], 'old_idx');
        $schema->getTable('districts')->addIndex(['old_id'], 'old_idx');
        $schema->getTable('city_districts')->addIndex(['old_id'], 'old_idx');
        $schema->getTable('institution_types')->addIndex(['old_id'], 'old_idx');
        $schema->getTable('institution_units')->addIndex(['old_id'], 'old_idx');
        $schema->getTable('institution_unit_departments')->addIndex(['old_id'], 'old_idx');
    }

    public function down(Schema $schema): void
    {
        $schema->getTable('cities')->dropIndex('old_idx');
        $schema->getTable('areas')->dropIndex('old_idx');
        $schema->getTable('districts')->dropIndex('old_idx');
        $schema->getTable('city_districts')->dropIndex('old_idx');
        $schema->getTable('institution_types')->dropIndex('old_idx');
        $schema->getTable('institution_units')->dropIndex('old_idx');
        $schema->getTable('institution_unit_departments')->dropIndex('old_idx');
    }
}

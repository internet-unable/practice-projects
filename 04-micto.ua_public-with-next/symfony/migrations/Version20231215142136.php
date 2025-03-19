<?php

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20231215142136 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add institution_units.type column';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE institution_units ADD type VARCHAR(50) DEFAULT NULL AFTER number');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE institution_units DROP type');
    }
}

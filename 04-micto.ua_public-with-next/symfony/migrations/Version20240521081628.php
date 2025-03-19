<?php

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240521081628 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add full_name column to institution_units';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE institutions ADD full_name VARCHAR(255) DEFAULT NULL after name');
        $this->addSql('ALTER TABLE institution_units ADD full_name VARCHAR(255) DEFAULT NULL after name');
        $this->addSql('ALTER TABLE institution_unit_departments ADD full_name VARCHAR(255) DEFAULT NULL after name');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE institutions DROP full_name');
        $this->addSql('ALTER TABLE institution_units DROP full_name');
        $this->addSql('ALTER TABLE institution_unit_departments DROP full_name');
    }
}

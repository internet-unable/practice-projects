<?php
namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240607120054 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add contacts to institution tables';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE institutions ADD contacts JSON DEFAULT NULL AFTER is_published');
        $this->addSql('ALTER TABLE institution_units ADD contacts JSON DEFAULT NULL AFTER old_id');
        $this->addSql('ALTER TABLE institution_unit_departments ADD contacts JSON DEFAULT NULL AFTER old_id');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE institutions DROP contacts');
        $this->addSql('ALTER TABLE institution_units DROP contacts');
        $this->addSql('ALTER TABLE institution_unit_departments DROP contacts');
    }
}

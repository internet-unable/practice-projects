<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240612135331 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE institution_unit_departments ADD description LONGTEXT DEFAULT NULL after old_id');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE institution_unit_departments DROP description');
    }
}

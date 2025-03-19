<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240717094615 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add has_several_units option to institution';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE institutions ADD has_several_units SMALLINT(1) DEFAULT 0 NOT NULL AFTER contacts');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE institutions DROP has_several_units');
    }
}

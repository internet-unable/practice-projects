<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240620135301 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add rating column';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE institutions ADD rating NUMERIC(2, 1) NOT NULL AFTER slug');
        $this->addSql('ALTER TABLE institution_units ADD rating NUMERIC(2, 1) NOT NULL AFTER slug');
        $this->addSql('ALTER TABLE institution_unit_departments ADD rating NUMERIC(2, 1) NOT NULL AFTER slug');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE institutions DROP rating');
        $this->addSql('ALTER TABLE institution_units DROP rating');
        $this->addSql('ALTER TABLE institution_unit_departments DROP rating');
    }
}

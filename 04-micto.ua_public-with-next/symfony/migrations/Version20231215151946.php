<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20231215151946 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add institution_units.old_id column';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE institution_units 
            ADD old_id INT UNSIGNED DEFAULT NULL AFTER type');
        $this->addSql('ALTER TABLE institution_units 
            CHANGE created_at created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL, 
            CHANGE updated_at updated_at DATETIME DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE institution_units DROP old_id');
        $this->addSql('ALTER TABLE institution_units 
            CHANGE created_at created_at DATETIME NOT NULL, 
            CHANGE updated_at updated_at DATETIME NOT NULL');
    }
}

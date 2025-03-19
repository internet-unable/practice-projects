<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20231218112253 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE institution_units 
            CHANGE slug slug VARCHAR(250) NOT NULL,
            CHANGE created_at created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL, 
            CHANGE updated_at updated_at DATETIME DEFAULT NULL');

        $this->addSql('CREATE UNIQUE INDEX UNIQ_8A8EF81989D9B62 ON institution_units (slug)');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE institution_units 
            CHANGE slug slug VARCHAR(100) NOT NULL,
            CHANGE created_at created_at DATETIME NOT NULL, 
            CHANGE updated_at updated_at DATETIME NOT NULL');

        $this->addSql('DROP INDEX UNIQ_8A8EF81989D9B62 on institution_units');
    }
}

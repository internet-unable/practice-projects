<?php

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240605080953 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add ZIP code field to address';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE addresses ADD zip_code VARCHAR(10) DEFAULT NULL, CHANGE address address VARCHAR(2000) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE addresses DROP zip_code, CHANGE address address TEXT NOT NULL');
    }
}

<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250219122825 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Multi-step registration';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('CREATE TABLE multi_step_registration (id INT AUTO_INCREMENT NOT NULL, data JSON NOT NULL, token VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, INDEX token_idx (token), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('DROP TABLE multi_step_registration');
    }
}

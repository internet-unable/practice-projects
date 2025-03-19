<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20250117101407 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Create media table';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('
            CREATE TABLE media (
                id INT AUTO_INCREMENT NOT NULL,
                entity_type VARCHAR(255) NOT NULL,
                entity_id INT NOT NULL,
                path VARCHAR(255) NOT NULL,
                size INT NOT NULL,
                type VARCHAR(50) NOT NULL,
                mime_type VARCHAR(100) NOT NULL,
                display_order INT NOT NULL DEFAULT 0,
                is_optimized TINYINT(1) DEFAULT 0 NOT NULL,
                created_at DATETIME NOT NULL,
                updated_at DATETIME NOT NULL,
                PRIMARY KEY(id)
            ) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB;
        ');

        $this->addSql('CREATE INDEX media_entity_idx ON media (entity_type, entity_id)');
        $this->addSql('CREATE INDEX type_idx ON media (type)');
        $this->addSql('CREATE INDEX is_optimized_idx ON media (is_optimized)');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('DROP TABLE media');
    }
}

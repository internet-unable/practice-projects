<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231221125540 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Create addresses table';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('CREATE TABLE addresses (id INT AUTO_INCREMENT NOT NULL, entity_id INT NOT NULL, address TEXT NOT NULL, latitude NUMERIC(12, 6) DEFAULT NULL, longitude NUMERIC(12, 6) DEFAULT NULL, UNIQUE INDEX UNIQ_D4E6F8181257D5D (entity_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE addresses ADD CONSTRAINT FK_D4E6F8181257D5D FOREIGN KEY (entity_id) REFERENCES institution_unit (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE addresses DROP FOREIGN KEY FK_D4E6F8181257D5D');
        $this->addSql('DROP TABLE addresses');
    }
}

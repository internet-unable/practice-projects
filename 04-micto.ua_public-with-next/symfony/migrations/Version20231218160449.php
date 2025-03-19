<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20231218160449 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Create comments table';
    }

    public function up(Schema $schema): void
    {
        $this->addSql("CREATE TABLE comments (
             id INT AUTO_INCREMENT NOT NULL,
             root_id INT DEFAULT NULL,
             parent_id INT DEFAULT NULL,
             institution_id INT NOT NULL,
             institution_unit_id INT DEFAULT NULL, 
             institution_unit_department_id INT DEFAULT NULL,
             type ENUM ('question','review','reply') DEFAULT 'question' NOT NULL,
             name VARCHAR(50) NOT NULL,
             email VARCHAR(255) DEFAULT NULL,
             phone VARCHAR(255) DEFAULT NULL,
             text LONGTEXT NOT NULL,
             mark SMALLINT UNSIGNED DEFAULT NULL,
             is_published TINYINT(1) DEFAULT 0 NOT NULL,
             entity_type VARCHAR(255) NOT NULL,
             created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
             updated_at DATETIME DEFAULT NULL,
             INDEX IDX_5F9E962A79066886 (root_id),
             INDEX IDX_5F9E962A727ACA70 (parent_id),
             INDEX IDX_5F9E962A10405986 (institution_id),
             INDEX IDX_5F9E962A9C43869F (institution_unit_id),
             INDEX IDX_5F9E962A568567D8 (institution_unit_department_id),
             PRIMARY KEY (id)
        ) DEFAULT CHARACTER SET utf8mb4
         COLLATE `utf8mb4_unicode_ci`
         ENGINE = InnoDB");
        $this->addSql('ALTER TABLE comments ADD CONSTRAINT FK_5F9E962A79066886 FOREIGN KEY (root_id) REFERENCES comments (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE comments ADD CONSTRAINT FK_5F9E962A727ACA70 FOREIGN KEY (parent_id) REFERENCES comments (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE comments ADD CONSTRAINT FK_5F9E962A10405986 FOREIGN KEY (institution_id) REFERENCES institutions (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE comments ADD CONSTRAINT FK_5F9E962A9C43869F FOREIGN KEY (institution_unit_id) REFERENCES institution_units (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE comments ADD CONSTRAINT FK_5F9E962A568567D8 FOREIGN KEY (institution_unit_department_id) REFERENCES institution_unit_departments (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE comments DROP FOREIGN KEY FK_5F9E962A79066886');
        $this->addSql('ALTER TABLE comments DROP FOREIGN KEY FK_5F9E962A727ACA70');
        $this->addSql('ALTER TABLE comments DROP FOREIGN KEY FK_5F9E962A10405986');
        $this->addSql('ALTER TABLE comments DROP FOREIGN KEY FK_5F9E962A9C43869F');
        $this->addSql('ALTER TABLE comments DROP FOREIGN KEY FK_5F9E962A568567D8');
        $this->addSql('DROP TABLE comments');
    }
}

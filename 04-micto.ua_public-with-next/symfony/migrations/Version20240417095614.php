<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240417095614 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Create user entity permissions table';
    }

    public function up(Schema $schema): void
    {
        $this->addSql("CREATE TABLE user_entity_permissions (
                id INT AUTO_INCREMENT NOT NULL, 
                user_id INT NOT NULL, 
                entity_type enum('Institution','InstitutionUnit','InstitutionUnitDepartment') NOT NULL, 
                entity_id INT NOT NULL, 
                INDEX IDX_3937047A76ED395 (user_id), 
                PRIMARY KEY(id)
            ) 
            DEFAULT CHARACTER SET utf8mb4 
            COLLATE `utf8mb4_unicode_ci` 
            ENGINE = InnoDB");

        $this->addSql('ALTER TABLE user_entity_permissions ADD CONSTRAINT FK_3937047A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE user_entity_permissions DROP FOREIGN KEY FK_3937047A76ED395');
        $this->addSql('DROP TABLE user_entity_permissions');
    }
}

<?php
namespace SoftUa\UserBundle\Migrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20241104174207 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'User data confirmation table';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('CREATE TABLE user_data_confirmation (
            id INT AUTO_INCREMENT NOT NULL, 
            user_id INT NOT NULL,
            data_type VARCHAR(255) NOT NULL, 
            code VARCHAR(255) NOT NULL,
            new_value VARCHAR(255) NULL, 
            is_completed BOOL DEFAULT 0 NOT NULL,
            created_at DATETIME NOT NULL, 
            updated_at DATETIME NOT NULL, 
            INDEX user_idx (user_id), 
            INDEX code_idx (code), 
            INDEX data_type_idx (data_type), 
            INDEX is_completed_idx (is_completed), 
            PRIMARY KEY(id)
        ) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');

        $this->addSql('ALTER TABLE user_data_confirmation ADD CONSTRAINT FK_USER_CONFIRMATION FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE ');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('DROP TABLE user_data_confirmation');
    }
}

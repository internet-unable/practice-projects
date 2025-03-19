<?php
namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240416124257 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add doctor profile table';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('CREATE TABLE user_profile_doctor (
                id INT AUTO_INCREMENT NOT NULL, 
                user_id INT NOT NULL, 
                position VARCHAR(255) NULL, 
                photo VARCHAR(255) NULL, 
                UNIQUE INDEX UNIQ_1C6F4B54A76ED395 (user_id), 
                PRIMARY KEY(id)
            ) 
            DEFAULT CHARACTER SET utf8mb4 
            COLLATE `utf8mb4_unicode_ci` 
            ENGINE = InnoDB'
        );
        $this->addSql('ALTER TABLE user_profile_doctor ADD CONSTRAINT FK_1C6F4B54A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE user_profile_doctor DROP FOREIGN KEY FK_1C6F4B54A76ED395');
        $this->addSql('DROP TABLE user_profile_doctor');
    }
}

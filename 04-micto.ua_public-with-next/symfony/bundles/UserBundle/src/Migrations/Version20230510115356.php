<?php
namespace SoftUa\UserBundle\Migrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20230510115356 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Create user and RBAC tables';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('CREATE TABLE role_permissions (
          id INT AUTO_INCREMENT NOT NULL,
          role_id INT DEFAULT NULL,
          code VARCHAR(255) NOT NULL,
          INDEX IDX_1FBA94E6D60322AC (role_id),
          UNIQUE INDEX role_id_code (role_id, code),
          PRIMARY KEY(id)
        ) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');

        $this->addSql('CREATE TABLE roles (
          id INT AUTO_INCREMENT NOT NULL,
          code VARCHAR(255) NOT NULL,
          description VARCHAR(255) NOT NULL,
          UNIQUE INDEX UNIQ_B63E2EC777153098 (code),
          PRIMARY KEY(id)
        ) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');

        $this->addSql('CREATE TABLE user (
          id INT AUTO_INCREMENT NOT NULL,
          email VARCHAR(180) NOT NULL,
          first_name VARCHAR(100) DEFAULT NULL,
          last_name VARCHAR(100) DEFAULT NULL,
          middle_name VARCHAR(100) DEFAULT NULL,
          password VARCHAR(255) NOT NULL,
          UNIQUE INDEX UNIQ_8D93D649E7927C74 (email),
          PRIMARY KEY(id)
        ) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');

        $this->addSql('CREATE TABLE user_role (
          user_id INT NOT NULL,
          role_id INT NOT NULL,
          INDEX IDX_2DE8C6A3A76ED395 (user_id),
          INDEX IDX_2DE8C6A3D60322AC (role_id),
          PRIMARY KEY(user_id, role_id)
        ) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE
          role_permissions
        ADD
          CONSTRAINT FK_1FBA94E6D60322AC FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE
          user_role
        ADD
          CONSTRAINT FK_2DE8C6A3A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE
          user_role
        ADD
          CONSTRAINT FK_2DE8C6A3D60322AC FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE CASCADE');

        $this->addSql("INSERT INTO roles (id, code, description) VALUES (1, 'SUPER_ADMIN', 'Може все')");
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE role_permissions DROP FOREIGN KEY FK_1FBA94E6D60322AC');
        $this->addSql('ALTER TABLE user_role DROP FOREIGN KEY FK_2DE8C6A3A76ED395');
        $this->addSql('ALTER TABLE user_role DROP FOREIGN KEY FK_2DE8C6A3D60322AC');
        $this->addSql('DROP TABLE role_permissions');
        $this->addSql('DROP TABLE roles');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE user_role');
    }
}

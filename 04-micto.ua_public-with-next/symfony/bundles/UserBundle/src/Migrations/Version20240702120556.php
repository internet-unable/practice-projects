<?php
namespace SoftUa\UserBundle\Migrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240702120556 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add user status options';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE `user` ADD is_active BOOL DEFAULT true NOT NULL');
        $this->addSql('ALTER TABLE `user` ADD is_admin_user BOOL DEFAULT false NOT NULL');
        $this->addSql('ALTER TABLE `user` ADD is_institution BOOL DEFAULT false NOT NULL');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE `user` DROP COLUMN is_active');
        $this->addSql('ALTER TABLE `user` DROP COLUMN is_admin_user');
        $this->addSql('ALTER TABLE `user` DROP COLUMN is_institution');
    }
}

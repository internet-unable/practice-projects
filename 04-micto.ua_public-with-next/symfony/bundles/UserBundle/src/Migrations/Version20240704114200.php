<?php
namespace SoftUa\UserBundle\Migrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240704114200 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add user status options';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE `user` ADD date_of_birth DATE NULL');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE `user` DROP COLUMN date_of_birth');
    }
}

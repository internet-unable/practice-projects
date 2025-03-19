<?php

namespace DoctrineMigrations;

use App\DBAL\Type\NotificationTypeEnumType;
use App\MysqlCheckTrait;
use Doctrine\DBAL\Schema\Schema;
use Doctrine\DBAL\Types\Types;
use Doctrine\Migrations\AbstractMigration;

final class Version20250207175925 extends AbstractMigration
{
    use MysqlCheckTrait;

    public function getDescription(): string
    {
        return 'Drop deprecated fields from user_entity_permissions table';
    }

    public function up(Schema $schema): void
    {
        $this->checkMysql();

        $this->addSql('ALTER TABLE user_entity_permissions DROP COLUMN entity_type');
        $this->addSql('ALTER TABLE user_entity_permissions DROP COLUMN entity_id');

        $this->addSql('ALTER TABLE user_entity_permissions DROP FOREIGN KEY fk_institution_permission');
        $this->addSql('ALTER TABLE user_entity_permissions MODIFY COLUMN institution_id int(11) NOT NULL');
        $this->addSql('ALTER TABLE user_entity_permissions ADD CONSTRAINT fk_institution_permission FOREIGN KEY (institution_id) REFERENCES institutions(id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        $this->checkMysql();
    }
}

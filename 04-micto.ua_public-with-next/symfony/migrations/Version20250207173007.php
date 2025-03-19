<?php

namespace DoctrineMigrations;

use App\DBAL\Type\NotificationTypeEnumType;
use App\MysqlCheckTrait;
use Doctrine\DBAL\Schema\Schema;
use Doctrine\DBAL\Types\Types;
use Doctrine\Migrations\AbstractMigration;

final class Version20250207173007 extends AbstractMigration
{
    use MysqlCheckTrait;

    public function getDescription(): string
    {
        return 'Migrate data to new user_entity_permissions table structure';
    }

    public function up(Schema $schema): void
    {
        $this->checkMysql();

        $this->addSql('UPDATE user_entity_permissions 
                SET institution_id=entity_id 
                WHERE entity_type = "Institution"
        ');

        $this->addSql('UPDATE user_entity_permissions p 
                JOIN institution_units u ON (u.id = p.entity_id)
                SET p.institution_unit_id=p.entity_id, p.institution_id = u.institution_id
                WHERE p.entity_type = "InstitutionUnit"
        ');

        $this->addSql('UPDATE user_entity_permissions p 
                JOIN institution_unit_departments d ON (d.id = p.entity_id)
                JOIN institution_units u ON (u.id = d.unit_id)
                SET p.unit_department_id=p.entity_id, p.institution_id = u.institution_id, p.institution_unit_id = u.id
                WHERE p.entity_type = "InstitutionUnitDepartment"
        ');
    }

    public function down(Schema $schema): void
    {
        $this->checkMysql();
    }
}

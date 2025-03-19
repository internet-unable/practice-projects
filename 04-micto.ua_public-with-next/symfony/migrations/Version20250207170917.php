<?php

namespace DoctrineMigrations;

use App\DBAL\Type\NotificationTypeEnumType;
use App\MysqlCheckTrait;
use Doctrine\DBAL\Schema\Schema;
use Doctrine\DBAL\Types\Types;
use Doctrine\Migrations\AbstractMigration;

final class Version20250207170917 extends AbstractMigration
{
    use MysqlCheckTrait;

    public function getDescription(): string
    {
        return 'Change user_entity_permissions table structure';
    }

    public function up(Schema $schema): void
    {
        $this->checkMysql();

        $table = $schema->getTable('user_entity_permissions');

        $table->addColumn('institution_id', Types::INTEGER, ['notnull' => false]);
        $table->addColumn('institution_unit_id', Types::INTEGER, ['notnull' => false]);
        $table->addColumn('unit_department_id', Types::INTEGER, ['notnull' => false]);

        $table->addIndex(['institution_id'], 'institution_idx');
        $table->addIndex(['institution_unit_id'], 'institution_unit_idx');
        $table->addIndex(['unit_department_id'], 'unit_department_idx');

        $table->addForeignKeyConstraint(
            'institutions',
            ['institution_id'],
            ['id'],
            ['onDelete' => 'CASCADE'],
            'fk_institution_permission'
        );
        $table->addForeignKeyConstraint(
            'institution_units',
            ['institution_unit_id'],
            ['id'],
            ['onDelete' => 'CASCADE'],
            'fk_institution_unit_permission'
        );
        $table->addForeignKeyConstraint(
            'institution_unit_departments',
            ['unit_department_id'],
            ['id'],
            ['onDelete' => 'CASCADE'],
            'fk_unit_department_permission'
        );
    }

    public function down(Schema $schema): void
    {
        $this->checkMysql();

        $table = $schema->getTable('user_entity_permissions');

        $table->removeForeignKey('fk_institution_permission');
        $table->removeForeignKey('fk_institution_unit_permission');
        $table->removeForeignKey('fk_unit_department_permission');
        $table->dropColumn('institution_id');
        $table->dropColumn('unit_id');
        $table->dropColumn('unit_department_id');
    }
}

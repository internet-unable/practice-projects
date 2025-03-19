<?php

namespace DoctrineMigrations;

use App\MysqlCheckTrait;
use Doctrine\DBAL\Schema\Schema;
use Doctrine\DBAL\Types\Types;
use Doctrine\Migrations\AbstractMigration;

final class Version20231207165400 extends AbstractMigration
{
    use MysqlCheckTrait;

    const OTG_TABLE = 'otg';
    const AREA_TABLE = 'areas';
    const DISTRICT_TABLE = 'districts';

    public function getDescription(): string
    {
        return 'Create OTG table';
    }

    public function up(Schema $schema): void
    {
        $this->checkMysql();

        $table = $schema->createTable(self::OTG_TABLE);
        $table->addColumn('id', Types::INTEGER, ['autoincrement' => true]);
        $table->addColumn('area_id', Types::INTEGER);
        $table->addColumn('district_id', Types::INTEGER);
        $table->addColumn('name', Types::STRING, ['length' => 255]);
        $table->addColumn('katottg', Types::STRING, ['length' => 25, 'notnull' => false]);
        $table->addColumn('old_id', Types::INTEGER, ['unsigned' => true, 'notnull' => false]);

        $table->setPrimaryKey(['id']);
        $table->addIndex(['area_id'], 'area_id_idx');
        $table->addIndex(['district_id'], 'district_id_idx');
        $table->addForeignKeyConstraint(
            self::AREA_TABLE,
            ['area_id'],
            ['id'],
            ['onUpdate' => 'CASCADE', 'onDelete' => 'CASCADE'],
            'fk_otg_area_id_areas_id'
        );
        $table->addForeignKeyConstraint(
            self::DISTRICT_TABLE,
            ['district_id'],
            ['id'],
            ['onUpdate' => 'CASCADE', 'onDelete' => 'CASCADE'],
            'fk_otg_district_id_districts_id'
        );
    }

    public function down(Schema $schema): void
    {
        $this->checkMysql();
        $schema->dropTable(self::OTG_TABLE);
    }
}

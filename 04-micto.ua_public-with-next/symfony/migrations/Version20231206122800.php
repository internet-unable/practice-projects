<?php

namespace DoctrineMigrations;

use App\MysqlCheckTrait;
use Doctrine\DBAL\Schema\Schema;
use Doctrine\DBAL\Types\Types;
use Doctrine\Migrations\AbstractMigration;

final class Version20231206122800 extends AbstractMigration
{
    use MysqlCheckTrait;

    const DISTRICT_TABLE = 'districts';
    const AREA_TABLE = 'areas';

    public function getDescription(): string
    {
        return 'Create districts table';
    }

    public function up(Schema $schema): void
    {
        $this->checkMysql();

        $table = $schema->createTable(self::DISTRICT_TABLE);
        $table->addColumn('id', Types::INTEGER, ['autoincrement' => true]);
        $table->addColumn('area_id', Types::INTEGER);
        $table->addColumn('name', Types::STRING, ['length' => 255]);
        $table->addColumn('code', Types::STRING, ['length' => 50]);
        $table->addColumn('katottg', Types::STRING, ['length' => 25, 'notnull' => false]);
        $table->addColumn('old_id', Types::INTEGER, ['unsigned' => true, 'notnull' => false]);

        $table->setPrimaryKey(['id']);
        $table->addIndex(['area_id'], 'area_id_idx');
        $table->addForeignKeyConstraint(
            self::AREA_TABLE,
            ['area_id'],
            ['id'],
            ['onUpdate' => 'CASCADE', 'onDelete' => 'CASCADE'],
            'fk_districts_area_id_areas_id'
        );
    }

    public function down(Schema $schema): void
    {
        $this->checkMysql();
        $schema->dropTable(self::DISTRICT_TABLE);
    }
}

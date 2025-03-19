<?php

namespace DoctrineMigrations;

use App\MysqlCheckTrait;
use Doctrine\DBAL\Schema\Schema;
use Doctrine\DBAL\Types\Types;
use Doctrine\Migrations\AbstractMigration;

final class Version20231211100746 extends AbstractMigration
{
    use MysqlCheckTrait;

    const CITY_DISTRICTS_TABLE = 'city_districts';
    const CITIES_TABLE = 'cities';

    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        $this->checkMysql();

        $table = $schema->createTable(self::CITY_DISTRICTS_TABLE);
        $table->addColumn('id', Types::INTEGER, ['autoincrement' => true]);
        $table->addColumn('city_id', Types::INTEGER);
        $table->addColumn('name', Types::STRING, ['length' => 255]);
        $table->addColumn('slug', Types::STRING, ['length' => 50]);
        $table->addColumn('katottg', Types::STRING, ['length' => 25, 'notnull' => false]);
        $table->addColumn('old_id', Types::INTEGER, ['unsigned' => true, 'notnull' => false]);

        $table->setPrimaryKey(['id']);
        $table->addForeignKeyConstraint(
            self::CITIES_TABLE,
            ['city_id'],
            ['id'],
            ['onUpdate' => 'CASCADE', 'onDelete' => 'CASCADE'],
            'fk_city_districts_city_id_cities_id'
        );
    }

    public function down(Schema $schema): void
    {
        $this->checkMysql();
        $schema->dropTable(self::CITY_DISTRICTS_TABLE);
    }
}

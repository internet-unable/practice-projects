<?php

namespace DoctrineMigrations;

use App\MysqlCheckTrait;
use Doctrine\DBAL\Schema\Schema;
use Doctrine\DBAL\Types\Types;
use Doctrine\Migrations\AbstractMigration;

final class Version20231205142100 extends AbstractMigration
{
    use MysqlCheckTrait;

    const AREA_TABLE = 'areas';

    public function getDescription(): string
    {
        return 'Create area table';
    }

    public function up(Schema $schema): void
    {
        $this->checkMysql();

        $table = $schema->createTable(self::AREA_TABLE);
        $table->addColumn('id', Types::INTEGER, ['autoincrement' => true]);
        $table->addColumn('name', Types::STRING, ['length' => 255]);
        $table->addColumn('code', Types::STRING, ['length' => 50]);
        $table->addColumn('katottg', Types::STRING, ['length' => 25, 'notnull' => false]);
        $table->addColumn('old_id', Types::INTEGER, ['unsigned' => true, 'notnull' => false]);

        $table->setPrimaryKey(['id']);
    }

    public function down(Schema $schema): void
    {
        $this->checkMysql();

        $schema->dropTable(self::AREA_TABLE);
    }
}

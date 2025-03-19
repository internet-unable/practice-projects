<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use App\MysqlCheckTrait;
use Doctrine\DBAL\Schema\Schema;
use Doctrine\DBAL\Types\Types;
use Doctrine\Migrations\AbstractMigration;

final class Version20231211133723 extends AbstractMigration
{
    use MysqlCheckTrait;

    const INSTITUTION_TYPE_TABLE = 'institution_type';

    public function getDescription(): string
    {
        return 'Institution type table';
    }

    public function up(Schema $schema): void
    {
        $this->checkMysql();

        $table = $schema->createTable(self::INSTITUTION_TYPE_TABLE);
        $table->addColumn('id', Types::INTEGER, ['autoincrement' => true]);
        $table->addColumn('name', Types::STRING, ['length' => 255]);
        $table->addColumn('slug', Types::STRING, ['length' => 100]);
        $table->addColumn('old_id', Types::INTEGER, ['unsigned' => true, 'notnull' => false]);

        $table->setPrimaryKey(['id']);
    }

    public function down(Schema $schema): void
    {
        $this->checkMysql();

        $schema->dropTable(self::INSTITUTION_TYPE_TABLE);
    }
}

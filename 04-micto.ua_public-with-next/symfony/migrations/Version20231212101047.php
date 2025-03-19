<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use App\MysqlCheckTrait;
use Doctrine\DBAL\Schema\Schema;
use Doctrine\DBAL\Types\Types;
use Doctrine\Migrations\AbstractMigration;

final class Version20231212101047 extends AbstractMigration
{
    use MysqlCheckTrait;

    const INSTITUTION_TABLE = 'institution';
    const INSTITUTION_TYPE_TABLE = 'institution_type';
    const CITIES_TABLE = 'cities';
    const CITY_DISTRICT_TABLE = 'city_districts';

    public function getDescription(): string
    {
        return 'Create institution table';
    }

    public function up(Schema $schema): void
    {
        $this->checkMysql();

        $table = $schema->createTable(self::INSTITUTION_TABLE);
        $table->addColumn('id', Types::INTEGER, ['autoincrement' => true]);
        $table->addColumn('institution_type_id', Types::INTEGER)
            ->setNotnull(false);
        $table->addColumn('city_id', Types::INTEGER)
            ->setNotnull(true);
        $table->addColumn('city_district_id', Types::INTEGER)
            ->setNotnull(false);
        $table->addColumn('name', Types::STRING, ['length' => 255]);
        $table->addColumn('slug', Types::STRING, ['length' => 100]);
        $table->addColumn('edrpou', Types::STRING, ['length' => 8]);
        $table->addColumn('description', Types::TEXT, ['notnull' => false]);
        $table->addColumn('is_published', Types::BOOLEAN)
            ->setNotnull(true)
            ->setDefault(true);
        $table->addColumn('old_id', Types::INTEGER, ['unsigned' => true, 'notnull' => false]);
        $table->setPrimaryKey(['id']);
        $table->addIndex(['institution_type_id'], 'institution_type_idx');
        $table->addIndex(['city_id'], 'city_idx');
        $table->addIndex(['city_district_id'], 'city_district_idx');
        $table->addForeignKeyConstraint(
            self::INSTITUTION_TYPE_TABLE,
            ['institution_type_id'],
            ['id'],
            ['onUpdate' => 'CASCADE', 'onDelete' => 'SET NULL'],
            'FK_3A9F98E5A1B27A01'
        );
        $table->addForeignKeyConstraint(
            self::CITIES_TABLE,
            ['city_id'],
            ['id'],
            ['onUpdate' => 'CASCADE', 'onDelete' => 'CASCADE'],
            'FK_3A9F98E58BAC62AF'
        );
        $table->addForeignKeyConstraint(
            self::CITY_DISTRICT_TABLE,
            ['city_district_id'],
            ['id'],
            ['onUpdate' => 'CASCADE', 'onDelete' => 'SET NULL'],
            'FK_3A9F98E5933BBC7D'
        );
    }

    public function down(Schema $schema): void
    {
        $this->checkMysql();

        $schema->dropTable(self::INSTITUTION_TABLE);
    }
}

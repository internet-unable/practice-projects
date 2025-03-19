<?php

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\DBAL\Types\Types;
use Doctrine\Migrations\AbstractMigration;

final class Version20231214092856 extends AbstractMigration
{
    const INSTITUTION_UNITS_TABLE = 'institution_units';
    const INSTITUTION_TABLE = 'institution';

    public function getDescription(): string
    {
        return 'Create institution units table';
    }

    public function up(Schema $schema): void
    {
        $table = $schema->createTable(self::INSTITUTION_UNITS_TABLE);
        $table->addColumn('id', Types::INTEGER, ['autoincrement' => true]);
        $table->addColumn('institution_id', Types::INTEGER);
        $table->addColumn('is_published', Types::BOOLEAN)
            ->setNotnull(true)
            ->setDefault(true);
        $table->addColumn('name', Types::STRING, ['length' => 255]);
        $table->addColumn('slug', Types::STRING, ['length' => 100]);
        $table->addColumn('number', Types::STRING, ['notnull' => false]);
        $table->addColumn('created_at', Types::DATETIME_MUTABLE);
        $table->addColumn('updated_at', Types::DATETIME_MUTABLE);

        $table->setPrimaryKey(['id']);
        $table->addIndex(['slug']);
        $table->addForeignKeyConstraint(
            self::INSTITUTION_TABLE,
            ['institution_id'],
            ['id'],
            ['onDelete' => 'CASCADE']
        );
    }

    public function down(Schema $schema): void
    {
        $schema->dropTable(self::INSTITUTION_UNITS_TABLE);
    }
}

<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\DBAL\Types\Types;
use Doctrine\Migrations\AbstractMigration;

final class Version20241011130417 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add chief and head doctor name to institution unit table';
    }

    public function up(Schema $schema): void
    {
        $table = $schema->getTable('institution_units');

        $table->addColumn('chief_name', Types::STRING, ['length' => 255, 'notnull' => false]);
        $table->addColumn('head_doctor_name', Types::STRING, ['length' => 255, 'notnull' => false]);
    }

    public function down(Schema $schema): void
    {
        $schema->getTable('institution_units')->dropColumn('chief_name');
        $schema->getTable('institution_units')->dropColumn('head_doctor_name');
    }
}

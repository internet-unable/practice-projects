<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\DBAL\Types\Types;
use Doctrine\Migrations\AbstractMigration;

final class Version20241017121000 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add is_around_the_clock into schedules table';
    }

    public function up(Schema $schema): void
    {
        $table = $schema->getTable('schedules');

        $table->addColumn('is_around_the_clock', Types::BOOLEAN)
            ->setNotnull(true)
            ->setDefault(false);
    }

    public function down(Schema $schema): void
    {
        $schema->getTable('institution_units')->dropColumn('is_around_the_clock');
    }
}

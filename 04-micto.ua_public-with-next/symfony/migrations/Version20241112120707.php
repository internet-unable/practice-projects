<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\DBAL\Types\Types;
use Doctrine\Migrations\AbstractMigration;

final class Version20241112120707 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add map_url into addresses table';
    }

    public function up(Schema $schema): void
    {
        $table = $schema->getTable('addresses');

        $table->addColumn('map_url', Types::STRING)
            ->setLength(255)
            ->setNotnull(false);
    }

    public function down(Schema $schema): void
    {
        $schema->getTable('addresses')->dropColumn('map_url');
    }
}

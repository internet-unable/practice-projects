<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240718174623 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Mark city Kyiv as area center';
    }

    public function up(Schema $schema): void
    {
        $this->addSql("UPDATE cities SET area_center = 1 WHERE slug = 'kyiv'");
    }

    public function down(Schema $schema): void
    {
    }
}

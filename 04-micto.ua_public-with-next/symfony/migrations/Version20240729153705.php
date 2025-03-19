<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240729153705 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add is published option to area';
    }

    public function up(Schema $schema): void
    {
        $this->addSql("ALTER TABLE areas ADD is_published BOOL DEFAULT 1 NOT NULL");
        $this->addSql("UPDATE areas SET is_published = 0 WHERE old_id = 890");
    }

    public function down(Schema $schema): void
    {
        $this->addSql("ALTER TABLE areas DROP COLUMN is_published");
    }
}

<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240628154057 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add old_id to comments';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE comments ADD old_id INT DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE comments DROP old_id');
    }
}

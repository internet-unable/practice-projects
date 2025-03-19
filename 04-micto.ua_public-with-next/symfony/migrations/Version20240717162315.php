<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240717162315 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add like and dislike to comments';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE comments ADD num_likes INT(11) DEFAULT 0 NOT NULL AFTER month_of_visit');
        $this->addSql('ALTER TABLE comments ADD num_dislikes INT(11) DEFAULT 0 NOT NULL AFTER num_likes');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE comments DROP num_likes');
        $this->addSql('ALTER TABLE comments DROP num_dislikes');
    }
}

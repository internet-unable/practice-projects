<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\DBAL\Types\Types;
use Doctrine\Migrations\AbstractMigration;

final class Version20241001152938 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Update is_notification_sent in comments tables';
    }

    public function up(Schema $schema): void
    {
        $this->addSql("UPDATE comments SET is_notification_sent = is_published");
    }

    public function down(Schema $schema): void
    {
    }
}

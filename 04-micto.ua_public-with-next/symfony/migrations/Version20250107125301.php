<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20250107125301 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add is_admin and is_institution marks to comments';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE comments ADD is_admin TINYINT(1) DEFAULT 0 NOT NULL COMMENT "Comment from the site administration"');
        $this->addSql('ALTER TABLE comments ADD is_institution TINYINT(1) DEFAULT 0 NOT NULL COMMENT "Comment from a representative of a medical institution"');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE comments DROP is_admin');
        $this->addSql('ALTER TABLE comments DROP is_institution');
    }
}

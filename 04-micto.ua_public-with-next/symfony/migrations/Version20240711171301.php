<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240711171301 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add visit institution date and new comment type to comments';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE comments ADD year_of_visit SMALLINT(4) NULL AFTER user_id');
        $this->addSql('ALTER TABLE comments ADD month_of_visit SMALLINT(4) NULL AFTER year_of_visit');
        $this->addSql('ALTER TABLE comments MODIFY COLUMN `type` enum("question","review","reply","complaint","gratitude") DEFAULT "review" NOT NULL');
        $this->addSql('ALTER TABLE comments MODIFY COLUMN `name` varchar(255) NULL');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE comments DROP year_of_visit');
        $this->addSql('ALTER TABLE comments DROP month_of_visit');
        $this->addSql('ALTER TABLE comments MODIFY COLUMN `type` enum("question","review","reply") DEFAULT "question" NOT NULL');
        $this->addSql('ALTER TABLE comments MODIFY COLUMN `name` varchar(50) NOT NULL');
    }
}

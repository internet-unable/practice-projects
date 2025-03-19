<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240705121707 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add institution role';
    }

    public function up(Schema $schema): void
    {
        $this->addSql("INSERT INTO roles (code, description) VALUES ('INSTITUTION', 'Медзаклад')");
        $this->addSql("INSERT INTO role_permissions (role_id, code) VALUES ((SELECT id FROM roles WHERE code = 'INSTITUTION'), 'INSTITUTION_MANAGER')");
    }

    public function down(Schema $schema): void
    {
        $this->addSql("DELETE FROM roles WHERE code = 'INSTITUTION'");
    }
}

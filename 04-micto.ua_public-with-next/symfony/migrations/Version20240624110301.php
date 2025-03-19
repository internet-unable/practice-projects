<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240624110301 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add name indexes to cities and districts';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('CREATE INDEX IDX_D95DB16B5E237E06 ON cities (name)');
        $this->addSql('CREATE INDEX IDX_68E318DC5E237E06 ON districts (name)');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('drop index IDX_D95DB16B5E237E06 on cities');
        $this->addSql('drop index IDX_68E318DC5E237E06 on districts');
    }
}

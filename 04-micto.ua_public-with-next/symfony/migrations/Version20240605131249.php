<?php

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240605131249 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Update institution units table';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('alter table institution_units
            add legal_form enum (\'company\', \'private\', \'concern\', \'corporation\') default null after edrpou;');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE institution_units DROP COLUMN legal_form');
    }
}

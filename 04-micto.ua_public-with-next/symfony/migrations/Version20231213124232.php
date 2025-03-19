<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use App\MysqlCheckTrait;
use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20231213124232 extends AbstractMigration
{
    use MysqlCheckTrait;

    public function getDescription(): string
    {
        return 'Add created and updated fields to institution table';
    }

    public function up(Schema $schema): void
    {
        $this->checkMysql();

        $this->addSql('ALTER TABLE institution CHANGE edrpou edrpou VARCHAR(8) DEFAULT NULL');
        $this->addSql('ALTER TABLE institution ADD created_at DATETIME NOT NULL, ADD updated_at DATETIME NOT NULL');
        $this->addSql('ALTER TABLE institution ADD ownership_form ENUM(\'state\',\'private\',\'collective\') DEFAULT \'state\' NOT NULL');
    }

    public function down(Schema $schema): void
    {
        $this->checkMysql();

        $this->addSql('ALTER TABLE institution CHANGE edrpou edrpou VARCHAR(8) NOT NULL');
        $this->addSql('ALTER TABLE institution DROP created_at, DROP updated_at');
        $this->addSql('ALTER TABLE institution DROP ownership_form');
    }
}

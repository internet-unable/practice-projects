<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use App\MysqlCheckTrait;
use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231211105401 extends AbstractMigration
{
    use MysqlCheckTrait;

    public function getDescription(): string
    {
        return 'Rename code to slug';
    }

    public function up(Schema $schema): void
    {
        $this->checkMysql();

        $this->addSql('ALTER TABLE areas CHANGE code slug VARCHAR(50) NOT NULL');
        $this->addSql('ALTER TABLE cities CHANGE code slug VARCHAR(50) NOT NULL');
        $this->addSql('ALTER TABLE districts CHANGE code slug VARCHAR(50) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        $this->checkMysql();

        $this->addSql('ALTER TABLE areas CHANGE slug code VARCHAR(50) NOT NULL');
        $this->addSql('ALTER TABLE cities CHANGE slug code VARCHAR(50) NOT NULL');
        $this->addSql('ALTER TABLE districts CHANGE slug code VARCHAR(50) NOT NULL');
    }
}

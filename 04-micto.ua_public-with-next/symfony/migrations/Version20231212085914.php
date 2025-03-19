<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use App\MysqlCheckTrait;
use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20231212085914 extends AbstractMigration
{
    use MysqlCheckTrait;

    public function getDescription(): string
    {
        return 'Add cities.area_center column';
    }

    public function up(Schema $schema): void
    {
        $this->checkMysql();

        $this->addSql('ALTER TABLE cities ADD area_center TINYINT(1) DEFAULT 0 NOT NULL AFTER katottg');
        $this->addSql('UPDATE cities SET area_center=1 WHERE old_id IN (29258,29256,29189,28452,28368,28314,27870,27128,26586,24925,23327,22189,19577,16534,15088,15057,14899,13468,10580,9596,8951,8361,8068,5269)');
    }

    public function down(Schema $schema): void
    {
        $this->checkMysql();
        $this->addSql('ALTER TABLE cities DROP area_center');
    }
}

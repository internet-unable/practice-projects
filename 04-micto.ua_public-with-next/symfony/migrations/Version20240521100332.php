<?php

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240521100332 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add schedules table';
    }

    public function up(Schema $schema): void
    {
        $this->addSql("CREATE TABLE schedules (id INT AUTO_INCREMENT NOT NULL, 
            entity_id INT NOT NULL, 
            entity_type ENUM('InstitutionUnit', 'UnitDepartment') NOT NULL,
            day_of_week ENUM('Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun') NOT NULL,
            start_time TIME DEFAULT NULL, 
            end_time TIME DEFAULT NULL, 
            is_holiday TINYINT(1) DEFAULT 0 NOT NULL, 
            INDEX IDX_313BDC8E81257D5D (entity_id), 
            UNIQUE INDEX UNIQ_313BDC8EC412EE0281257D5D6A79171 (entity_type, entity_id, day_of_week),
            PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 
            COLLATE `utf8mb4_unicode_ci` 
            ENGINE = InnoDB"
        );
    }

    public function down(Schema $schema): void
    {
        $this->addSql('DROP TABLE schedules');
    }
}

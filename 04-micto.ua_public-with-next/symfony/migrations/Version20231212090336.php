<?php

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20231212090336 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add special cities and village_s type';
    }

    public function up(Schema $schema): void
    {
        $this->addSql("ALTER TABLE cities
            modify district_id int null,
            modify otg_id int null,
            modify type enum ('special', 'city', 'village', 'village_s', 'smt') not null comment '(DC2Type:CityTypeEnumType)'
        ");

        $this->addSql("
            INSERT INTO cities (id, area_id, district_id, otg_id, type, name, slug, katottg, old_id) 
            VALUES (null, 10, null, null, 'special', 'Київ', 'kyiv', 'UA80000000000093317', 899)
        ");

        $this->addSql("
            INSERT INTO cities (id, area_id, district_id, otg_id, type, name, slug, katottg, old_id) 
            VALUES (null, 1, null, null, 'special', 'Севастополь', 'sevastopol', 'UA85000000000065278', 908)
        ");
    }

    public function down(Schema $schema): void
    {
        $this->addSql('set foreign_key_checks = 0');
        $this->addSql("ALTER TABLE cities
            modify district_id int not null,
            modify otg_id int not null,
            modify type enum ('city', 'village', 'smt') not null comment '(DC2Type:CityTypeEnumType)'"
        );
        $this->addSql('set foreign_key_checks = 1');

        $this->addSql("DELETE FROM micto.cities WHERE old_id IN(908, 899)");
    }
}

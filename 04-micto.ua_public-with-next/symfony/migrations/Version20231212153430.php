<?php

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20231212153430 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Update foreign keys and indexes';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE cities DROP FOREIGN KEY fk_cities_district_id_districts_id');
        $this->addSql('ALTER TABLE cities DROP FOREIGN KEY fk_cities_otg_id_districts_id');
        $this->addSql('ALTER TABLE cities DROP FOREIGN KEY fk_cities_area_id_areas_id');
        $this->addSql('ALTER TABLE cities ADD CONSTRAINT FK_D95DB16BBD0F409C FOREIGN KEY (area_id) REFERENCES areas (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE cities ADD CONSTRAINT FK_D95DB16BB08FA272 FOREIGN KEY (district_id) REFERENCES districts (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE cities ADD CONSTRAINT FK_D95DB16B7BC389BB FOREIGN KEY (otg_id) REFERENCES otg (id) ON DELETE SET NULL');
        $this->addSql('ALTER TABLE city_districts DROP FOREIGN KEY fk_city_districts_city_id_cities_id');
        $this->addSql('ALTER TABLE city_districts ADD CONSTRAINT FK_CCB704C98BAC62AF FOREIGN KEY (city_id) REFERENCES cities (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE districts DROP FOREIGN KEY fk_districts_area_id_areas_id');
        $this->addSql('ALTER TABLE districts ADD CONSTRAINT FK_68E318DCBD0F409C FOREIGN KEY (area_id) REFERENCES areas (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE otg DROP FOREIGN KEY fk_otg_area_id_areas_id');
        $this->addSql('ALTER TABLE otg DROP FOREIGN KEY fk_otg_district_id_districts_id');
        $this->addSql('ALTER TABLE otg ADD CONSTRAINT FK_244F1D06BD0F409C FOREIGN KEY (area_id) REFERENCES areas (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE otg ADD CONSTRAINT FK_244F1D06B08FA272 FOREIGN KEY (district_id) REFERENCES districts (id) ON DELETE CASCADE');

        $this->addSql('CREATE INDEX IDX_58B0B25C989D9B62 ON areas (slug)');
        $this->addSql('CREATE INDEX IDX_D95DB16B8CDE5729 ON cities (type)');
        $this->addSql('CREATE INDEX IDX_D95DB16B989D9B62 ON cities (slug)');
        $this->addSql('CREATE INDEX IDX_68E318DC989D9B62 ON districts (slug)');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE cities DROP FOREIGN KEY FK_D95DB16BBD0F409C');
        $this->addSql('ALTER TABLE cities DROP FOREIGN KEY FK_D95DB16BB08FA272');
        $this->addSql('ALTER TABLE cities DROP FOREIGN KEY FK_D95DB16B7BC389BB');
        $this->addSql('ALTER TABLE cities ADD CONSTRAINT fk_cities_district_id_districts_id FOREIGN KEY (district_id) REFERENCES districts (id) ON UPDATE CASCADE ON DELETE CASCADE');
        $this->addSql('ALTER TABLE cities ADD CONSTRAINT fk_cities_otg_id_districts_id FOREIGN KEY (otg_id) REFERENCES otg (id) ON UPDATE CASCADE ON DELETE CASCADE');
        $this->addSql('ALTER TABLE cities ADD CONSTRAINT fk_cities_area_id_areas_id FOREIGN KEY (area_id) REFERENCES areas (id) ON UPDATE CASCADE ON DELETE CASCADE');
        $this->addSql('ALTER TABLE city_districts DROP FOREIGN KEY FK_CCB704C98BAC62AF');
        $this->addSql('ALTER TABLE city_districts ADD CONSTRAINT fk_city_districts_city_id_cities_id FOREIGN KEY (city_id) REFERENCES cities (id) ON UPDATE CASCADE ON DELETE CASCADE');
        $this->addSql('ALTER TABLE districts DROP FOREIGN KEY FK_68E318DCBD0F409C');
        $this->addSql('ALTER TABLE districts ADD CONSTRAINT fk_districts_area_id_areas_id FOREIGN KEY (area_id) REFERENCES areas (id) ON UPDATE CASCADE ON DELETE CASCADE');
        $this->addSql('ALTER TABLE otg DROP FOREIGN KEY FK_244F1D06BD0F409C');
        $this->addSql('ALTER TABLE otg DROP FOREIGN KEY FK_244F1D06B08FA272');
        $this->addSql('ALTER TABLE otg ADD CONSTRAINT fk_otg_area_id_areas_id FOREIGN KEY (area_id) REFERENCES areas (id) ON UPDATE CASCADE ON DELETE CASCADE');
        $this->addSql('ALTER TABLE otg ADD CONSTRAINT fk_otg_district_id_districts_id FOREIGN KEY (district_id) REFERENCES districts (id) ON UPDATE CASCADE ON DELETE CASCADE');

        $this->addSql('DROP INDEX IDX_58B0B25C989D9B62 ON areas');
        $this->addSql('DROP INDEX IDX_D95DB16B8CDE5729 ON cities');
        $this->addSql('DROP INDEX IDX_D95DB16B989D9B62 ON cities');
        $this->addSql('DROP INDEX IDX_68E318DC989D9B62 ON districts');
    }
}

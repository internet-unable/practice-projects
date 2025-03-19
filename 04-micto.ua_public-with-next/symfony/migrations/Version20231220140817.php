<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231220140817 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Create table institution department';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('CREATE TABLE institution_department (
            id INT AUTO_INCREMENT NOT NULL, 
            institution_id INT NOT NULL,
            type_id INT DEFAULT NULL, 
            name VARCHAR(255) NOT NULL, 
            slug VARCHAR(255) NOT NULL,
            edrpou VARCHAR(8) DEFAULT NULL, 
            city_id INT NOT NULL, 
            city_district_id INT DEFAULT NULL, 
            description LONGTEXT DEFAULT NULL,
            is_published TINYINT(1) DEFAULT 1 NOT NULL, 
            old_id INT UNSIGNED DEFAULT NULL, 
            created_at DATETIME NOT NULL, 
            updated_at DATETIME NOT NULL, 
            INDEX type_idx (type_id), 
            INDEX city_district_idx (city_district_id), 
            INDEX city_idx (city_id), 
            INDEX institution_idx (institution_id), 
            INDEX published_idx (is_published), 
            INDEX slug_idx (slug), 
            PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        ');

        $this->addSql('ALTER TABLE institution_department ADD CONSTRAINT FK_2B691450C54C8C93 FOREIGN KEY (type_id) REFERENCES institution_type (id) ON DELETE SET NULL');
        $this->addSql('ALTER TABLE institution_department ADD CONSTRAINT FK_2B6914508BAC62AF FOREIGN KEY (city_id) REFERENCES cities (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE institution_department ADD CONSTRAINT FK_2B691450933BBC7D FOREIGN KEY (city_district_id) REFERENCES city_districts (id) ON DELETE SET NULL');
        $this->addSql('ALTER TABLE institution_department ADD CONSTRAINT FK_2B69145010405986 FOREIGN KEY (institution_id) REFERENCES institution (id) ON DELETE CASCADE');

        $this->addSql('ALTER TABLE institution DROP FOREIGN KEY FK_3A9F98E58BAC62AF');
        $this->addSql('ALTER TABLE institution DROP FOREIGN KEY FK_3A9F98E5933BBC7D');
        $this->addSql('ALTER TABLE institution DROP FOREIGN KEY FK_3A9F98E5A1B27A01');
        $this->addSql('DROP INDEX city_district_idx ON institution');
        $this->addSql('DROP INDEX institution_type_idx ON institution');
        $this->addSql('DROP INDEX city_idx ON institution');
        $this->addSql('ALTER TABLE institution 
            DROP institution_type_id, 
            DROP city_id, 
            DROP city_district_id, 
            DROP edrpou, 
            DROP old_id, 
            CHANGE slug slug VARCHAR(255) NOT NULL
        ');
        $this->addSql('CREATE INDEX published_idx ON institution (is_published)');
        $this->addSql('CREATE INDEX slug_idx ON institution (slug)');
        $this->addSql('ALTER TABLE institution_units DROP FOREIGN KEY FK_8A8EF8110405986');
        $this->addSql('DROP INDEX IDX_8A8EF8110405986 ON institution_units');
        $this->addSql('ALTER TABLE institution_units 
            DROP type, 
            CHANGE created_at created_at DATETIME NOT NULL, 
            CHANGE updated_at updated_at DATETIME NOT NULL, 
            CHANGE institution_id department_id INT NOT NULL
        ');
        $this->addSql('ALTER TABLE institution_units ADD CONSTRAINT FK_8A8EF81AE80F5DF FOREIGN KEY (department_id) REFERENCES institution_department (id) ON DELETE CASCADE');
        $this->addSql('CREATE INDEX department_idx ON institution_units (department_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE institution_units DROP FOREIGN KEY FK_8A8EF81AE80F5DF');
        $this->addSql('ALTER TABLE institution_department DROP FOREIGN KEY FK_2B691450C54C8C93');
        $this->addSql('ALTER TABLE institution_department DROP FOREIGN KEY FK_2B6914508BAC62AF');
        $this->addSql('ALTER TABLE institution_department DROP FOREIGN KEY FK_2B691450933BBC7D');
        $this->addSql('ALTER TABLE institution_department DROP FOREIGN KEY FK_2B69145010405986');
        $this->addSql('DROP TABLE institution_department');
        $this->addSql('DROP INDEX published_idx ON institution');
        $this->addSql('DROP INDEX slug_idx ON institution');
        $this->addSql('ALTER TABLE institution ADD institution_type_id INT DEFAULT NULL, ADD city_id INT NOT NULL, ADD city_district_id INT DEFAULT NULL, ADD edrpou VARCHAR(8) DEFAULT NULL, ADD old_id INT UNSIGNED DEFAULT NULL, CHANGE slug slug VARCHAR(100) NOT NULL');
        $this->addSql('ALTER TABLE institution ADD CONSTRAINT FK_3A9F98E58BAC62AF FOREIGN KEY (city_id) REFERENCES cities (id) ON UPDATE CASCADE ON DELETE CASCADE');
        $this->addSql('ALTER TABLE institution ADD CONSTRAINT FK_3A9F98E5933BBC7D FOREIGN KEY (city_district_id) REFERENCES city_districts (id) ON UPDATE CASCADE ON DELETE SET NULL');
        $this->addSql('ALTER TABLE institution ADD CONSTRAINT FK_3A9F98E5A1B27A01 FOREIGN KEY (institution_type_id) REFERENCES institution_type (id) ON UPDATE CASCADE ON DELETE SET NULL');
        $this->addSql('CREATE INDEX city_district_idx ON institution (city_district_id)');
        $this->addSql('CREATE INDEX institution_type_idx ON institution (institution_type_id)');
        $this->addSql('CREATE INDEX city_idx ON institution (city_id)');
        $this->addSql('DROP INDEX department_idx ON institution_units');
        $this->addSql('ALTER TABLE institution_units ADD type VARCHAR(50) DEFAULT NULL, CHANGE created_at created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL, CHANGE updated_at updated_at DATETIME DEFAULT NULL, CHANGE department_id institution_id INT NOT NULL');
        $this->addSql('ALTER TABLE institution_units ADD CONSTRAINT FK_8A8EF8110405986 FOREIGN KEY (institution_id) REFERENCES institution (id) ON DELETE CASCADE');
        $this->addSql('CREATE INDEX IDX_8A8EF8110405986 ON institution_units (institution_id)');
    }
}

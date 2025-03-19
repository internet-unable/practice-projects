<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231222120921 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Rename tables to plural form';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('RENAME TABLE institution TO institutions;');
        $this->addSql('RENAME TABLE institution_type TO institution_types;');
        $this->addSql('RENAME TABLE institution_unit TO institution_units;');
        $this->addSql('RENAME TABLE institution_unit_department TO institution_unit_departments;');
        $this->addSql('ALTER TABLE addresses RENAME INDEX uniq_d4e6f8181257d5d TO UNIQ_6FCA751681257D5D');
        $this->addSql('ALTER TABLE institution_unit_departments RENAME INDEX uniq_e79462c1989d9b62 TO UNIQ_F78AA94F989D9B62');
        $this->addSql('ALTER TABLE institution_unit_departments RENAME INDEX idx_e79462c1989d9b62 TO IDX_F78AA94F989D9B62');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE addresses RENAME INDEX uniq_6fca751681257d5d TO UNIQ_D4E6F8181257D5D');
        $this->addSql('ALTER TABLE institution_unit_departments RENAME INDEX uniq_f78aa94f989d9b62 TO UNIQ_E79462C1989D9B62');
        $this->addSql('ALTER TABLE institution_unit_departments RENAME INDEX idx_f78aa94f989d9b62 TO IDX_E79462C1989D9B62');
        $this->addSql('RENAME TABLE institutions TO institution;');
        $this->addSql('RENAME TABLE institution_types TO institution_type;');
        $this->addSql('RENAME TABLE institution_units TO institution_unit;');
        $this->addSql('RENAME TABLE institution_unit_departments TO institution_unit_department;');
    }
}

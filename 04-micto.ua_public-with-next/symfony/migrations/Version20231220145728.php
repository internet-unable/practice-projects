<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231220145728 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add indexes to institution tables';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE institution_unit_department DROP FOREIGN KEY FK_8A8EF81AE80F5DF');
        $this->addSql('DROP INDEX department_idx ON institution_unit_department');
        $this->addSql('ALTER TABLE institution_unit_department CHANGE slug slug VARCHAR(255) NOT NULL, CHANGE department_id unit_id INT NOT NULL');
        $this->addSql('ALTER TABLE institution_unit_department ADD CONSTRAINT FK_E79462C1F8BD700D FOREIGN KEY (unit_id) REFERENCES institution_unit (id) ON DELETE CASCADE');
        $this->addSql('CREATE INDEX unit_idx ON institution_unit_department (unit_id)');
        $this->addSql('CREATE INDEX published_idx ON institution_unit_department (is_published)');
        $this->addSql('CREATE INDEX slug_idx ON institution_unit_department (slug)');
        $this->addSql('ALTER TABLE institution_unit_department RENAME INDEX uniq_8a8ef81989d9b62 TO UNIQ_E79462C1989D9B62');
        $this->addSql('ALTER TABLE institution_unit_department RENAME INDEX idx_8a8ef81989d9b62 TO IDX_E79462C1989D9B62');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE institution_unit_department DROP INDEX IDX_E79462C1989D9B62, ADD INDEX IDX_8A8EF81989D9B62 (slug)');
        $this->addSql('ALTER TABLE institution_unit_department DROP FOREIGN KEY FK_E79462C1F8BD700D');
        $this->addSql('DROP INDEX unit_idx ON institution_unit_department');
        $this->addSql('DROP INDEX published_idx ON institution_unit_department');
        $this->addSql('DROP INDEX slug_idx ON institution_unit_department');
        $this->addSql('ALTER TABLE institution_unit_department CHANGE slug slug VARCHAR(250) NOT NULL, CHANGE unit_id department_id INT NOT NULL');
        $this->addSql('ALTER TABLE institution_unit_department ADD CONSTRAINT FK_8A8EF81AE80F5DF FOREIGN KEY (department_id) REFERENCES institution_unit (id) ON DELETE CASCADE');
        $this->addSql('CREATE INDEX department_idx ON institution_unit_department (department_id)');
        $this->addSql('ALTER TABLE institution_unit_department RENAME INDEX uniq_e79462c1989d9b62 TO UNIQ_8A8EF81989D9B62');
    }
}

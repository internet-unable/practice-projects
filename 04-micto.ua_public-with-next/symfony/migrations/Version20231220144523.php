<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231220144523 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Rename institution tables';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('RENAME TABLE institution_units TO institution_unit_department;');
        $this->addSql('RENAME TABLE institution_department TO institution_unit;');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('RENAME TABLE institution_unit TO institution_department;');
        $this->addSql('RENAME TABLE institution_unit_department TO institution_units;');
    }
}

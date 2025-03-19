<?php
namespace App;

trait MysqlCheckTrait
{
    private function checkMysql(): void
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');
    }
}

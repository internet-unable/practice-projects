<?php

namespace DoctrineMigrations;

use App\DBAL\Type\NotificationTypeEnumType;
use App\MysqlCheckTrait;
use Doctrine\DBAL\Schema\Schema;
use Doctrine\DBAL\Types\Types;
use Doctrine\Migrations\AbstractMigration;

final class Version20250122140546 extends AbstractMigration
{
    use MysqlCheckTrait;

    const NOTIFICATIONS_TABLE = 'notifications';
    const USER_NOTIFICATIONS_TABLE = 'user_notifications';

    public function getDescription(): string
    {
        return 'Create notifications tables';
    }

    public function up(Schema $schema): void
    {
        $this->checkMysql();

        // Notification table
        $notificationTable = $schema->createTable(self::NOTIFICATIONS_TABLE);
        $notificationTable->addColumn('id', Types::BIGINT, ['autoincrement' => true]);
        $notificationTable->addColumn('type', NotificationTypeEnumType::NAME, [
            'notnull' => true,
            'comment' => '(DC2Type:'.NotificationTypeEnumType::NAME.')',
        ]);
        $notificationTable->addColumn('comment_id', Types::INTEGER)->setNotnull(false);
        $notificationTable->addColumn('payload', Types::JSON)->setNotnull(true);
        $notificationTable->addColumn('is_sent', Types::BOOLEAN)
            ->setNotnull(true)
            ->setDefault(false);
        $notificationTable->addColumn('created_at', Types::DATETIME_MUTABLE)->setNotnull(true);
        $notificationTable->addColumn('updated_at', Types::DATETIME_MUTABLE)->setNotnull(true);

        $notificationTable->setPrimaryKey(['id']);

        $notificationTable->addIndex(['type'], 'type_idx');
        $notificationTable->addIndex(['is_sent'], 'is_sent_idx');
        $notificationTable->addIndex(['created_at'], 'created_at_idx');
        $notificationTable->addIndex(['comment_id'], 'comment_idx');

        $notificationTable->addForeignKeyConstraint(
            'comments',
            ['comment_id'],
            ['id'],
            ['onUpdate' => 'CASCADE', 'onDelete' => 'CASCADE'],
            'fk_comment_id'
        );

        // User notification table
        $table = $schema->createTable(self::USER_NOTIFICATIONS_TABLE);
        $table->addColumn('id', Types::BIGINT)->setAutoincrement(true);
        $table->addColumn('notification_id', Types::BIGINT)->setNotnull(true);
        $table->addColumn('user_id', Types::INTEGER)->setNotnull(true);
        $table->addColumn('is_read', Types::BOOLEAN)
            ->setNotnull(true)
            ->setDefault(false);
        $table->addColumn('read_at', Types::DATETIME_MUTABLE)->setNotnull(false);
        $table->addColumn('created_at', Types::DATETIME_MUTABLE)->setNotnull(true);

        $table->setPrimaryKey(['id']);
        $table->addIndex(['is_read'], 'is_read_idx');
        $table->addIndex(['created_at'], 'created_at_idx');
        $table->addIndex(['notification_id'], 'notification_idx');
        $table->addIndex(['user_id'], 'user_idx');

        $table->addForeignKeyConstraint(
            self::NOTIFICATIONS_TABLE,
            ['notification_id'],
            ['id'],
            ['onUpdate' => 'CASCADE', 'onDelete' => 'CASCADE'],
            'fk_user_notification_id'
        );

        $table->addForeignKeyConstraint(
            'user',
            ['user_id'],
            ['id'],
            ['onUpdate' => 'CASCADE', 'onDelete' => 'CASCADE'],
            'fk_user_id'
        );
    }

    public function down(Schema $schema): void
    {
        $this->checkMysql();
        $schema->dropTable(self::USER_NOTIFICATIONS_TABLE);
        $schema->dropTable(self::NOTIFICATIONS_TABLE);
    }
}

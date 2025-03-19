<?php

declare(strict_types=1);

namespace SoftUa\UserBundle\Configuration;

use Symfony\Component\DependencyInjection\ContainerBuilder;

class DoctrineMigrationConfiguration
{
    const MIGRATION_BUNDLE_ALIAS = 'doctrine_migrations';
    const MIGRATION_NAME = 'SoftUa\UserBundle\Migrations';
    const BUNDLE_MIGRATION_PATH = '@UserBundle/Migrations';

    public static function prepend(ContainerBuilder $container)
    {
        $extensions = $container->getExtensions();

        if (!isset($extensions[self::MIGRATION_BUNDLE_ALIAS])) {
            return;
        }

        $hasMigration = false;
        $migrationsConfig = $container->getExtensionConfig(self::MIGRATION_BUNDLE_ALIAS);

        foreach ($migrationsConfig as $config) {
            if (
                isset($config['migrations_paths'])
                && isset($config['migrations_paths'][static::MIGRATION_NAME])
            ) {
                $hasMigration = true;
                break;
            }
        }

        if ($hasMigration) {
            return;
        }

        $container->prependExtensionConfig(self::MIGRATION_BUNDLE_ALIAS, [
            "migrations_paths" => [
                static::MIGRATION_NAME => static::BUNDLE_MIGRATION_PATH,
            ]
        ]);
    }
}

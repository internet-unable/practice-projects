# User bundle

This bundle implements the User bundle with RBAC functionality.

## Installation
### Get the bundle using composer:
```bash
composer require soft-ua/user-bundle
```

### Enable the bundle
If you use Flex (you should!), the bundle is automatically enabled. 
Otherwise, to start using the bundle, register it in your application's kernel class:
```php
// config/bundles.php
return [
   // ...
   SoftUa\UserBundle\UserBundle::class => ['all' => true],
   // ...
]
```

## RBAC Configuration

### Create permissions
```shell
php bin/console rbac:permission:add
```

### Create role
```shell
php bin/console rbac:role:add
```

### Create user
```shell
php bin/console user:add
```

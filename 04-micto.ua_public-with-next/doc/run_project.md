# Running the project in local environment

- Copy .env file
```shell
cp symfony/.env symfony/.env.local
```

- Set DATABASE_URL in symfony/.env.local

```shell
DATABASE_URL="mysql://root:q2w3e4r5@host.docker.internal:3306/micto"
```

- [Build and start docker services](../docker/README.md)

- Install composer assets
```shell
docker exec -it micto_php composer install
```

- [Install and build frontend assets for symfony (admin area)](build_frontend.md)

- Ask other devs for DB dump and import it
```shell
docker exec -i micto_db mysql -u root -pq2w3e4r5 micto < dump.sql
```

- Run migrations (if needed)
```shell
docker exec -it micto_php bin/console doctrine:migrations:migrate
```

- [Install/build Nextjs app](../nextjs/README.md)

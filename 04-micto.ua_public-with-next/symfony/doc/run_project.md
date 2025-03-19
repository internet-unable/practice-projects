# Running the project in local environment

- Copy .env file
```shell
cp .env .env.local
```
and set all required values in `.env.local`

- [Build and start docker services](../docker/README.md)

- Install composer assets
```shell
docker exec -it micto_php composer install
```

- [Install and build frontend assets](build_frontend.md)

- Import DB dump (if needed)
```shell
docker exec -i micto_db mysql -u root -p micto < dump.sql
```

- Run migrations
```shell
docker exec -it micto_php bin/console doctrine:migrations:migrate
```

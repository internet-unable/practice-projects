## Install and build Nextjs app

```shell
docker compose run -it micto_nextjs npm i
```

### Dev environment

```shell
docker compose run -it micto_nextjs npm run dev
```

### Prod environment

```shell
docker compose run -it micto_nextjs npm run build
```

```shell
docker compose run -it micto_nextjs npm run prod
```

### NOTE

Aalternative way to use docker desktop app, find micto_nextjs container. Go to exec tab inside. Do all necessary commands without `docker compose run -it micto_nextjs`

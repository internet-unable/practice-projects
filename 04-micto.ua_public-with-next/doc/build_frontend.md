# Build frontend assets

Install libraries
```shell
docker compose run --rm micto_node npm install
```

Build in production mode
```shell
docker compose run --rm micto_node npm run build
```

<br/><br/>

`Deprecated`
Build in dev mode
```shell
docker compose run --rm micto_node npm run dev
```

`Deprecated`
Run watcher
```shell
docker compose run --rm micto_node npm run watch
```


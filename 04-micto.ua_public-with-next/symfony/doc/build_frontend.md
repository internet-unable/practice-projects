# Build frontend assets

Install libraries
```shell
docker exec -it micto_node npm install
```

Build in dev mode
```shell
docker exec -it micto_node npm run dev
```

Run watcher
```shell
docker exec -it micto_node npm run watch
```

Build in production mode
```shell
docker exec -it micto_node npm run build
```

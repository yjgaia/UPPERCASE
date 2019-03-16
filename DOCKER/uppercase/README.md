## Build
```
docker build . --tag hanul/uppercase:latest --build-arg CACHEBUST=$(date +%s)
```
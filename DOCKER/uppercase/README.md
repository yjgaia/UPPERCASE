## Build
### Mac OS X / Linux
```
docker build . --tag hanul/uppercase:latest --build-arg CACHEBUST=$(date +%s)
```

### Windows
```
docker build . --tag hanul/uppercase:latest --no-cache
```
docker build . --tag hanul/mongodb:0.1

docker run -v ~/test:/data/db -e MONGO_USERNAME=root -e MONGO_PASSWORD=test hanul/mongodb:0.1
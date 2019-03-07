mongod --port 27018 --fork --logpath /var/log/mongodb.log --logappend
mongo admin --port 27018 --eval "db.createUser({ user : '${MONGO_USERNAME}', pwd : '${MONGO_PASSWORD}', roles : ['root'] }); db.shutdownServer();"
mongod --port 27018 --fork --logpath /var/log/mongodb.log --logappend --auth --bind_ip_all
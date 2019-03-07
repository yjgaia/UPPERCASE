RUN mongod --port 27018 --fork --logpath /var/log/mongodb.log --logappend
RUN mongo --port 27018 --eval "use admin; db.createUser({ user : '${MONGO_USERNAME}', pwd : '${MONGO_PASSWORD}', roles : ['root'] }); db.shutdownServer();"
RUN mongod --port 27018 --fork --logpath /var/log/mongodb.log --logappend --auth --bind_ip_all
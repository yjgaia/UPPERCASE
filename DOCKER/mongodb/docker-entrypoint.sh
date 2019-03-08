#!/bin/bash

mongod --port 27018 --fork --logpath /var/log/mongodb.log --logappend
mongo ${MONGO_DB} --port 27018 --eval "db.getUsers().length > 0 ? undefined : db.createUser({ user : '${MONGO_USERNAME}', pwd : '${MONGO_PASSWORD}', roles : ['readWrite', 'dbAdmin'] });"
mongo admin --port 27018 --eval "db.system.users.find({ user : '${MONGO_ROOT_USERNAME}' }).count() > 0 ? undefined : db.createUser({ user : '${MONGO_ROOT_USERNAME}', pwd : '${MONGO_ROOT_PASSWORD}', roles : ['root'] }); db.shutdownServer();"
mongod --port 27018 --fork --logpath /var/log/mongodb.log --logappend --auth --bind_ip_all

tail -f /dev/null

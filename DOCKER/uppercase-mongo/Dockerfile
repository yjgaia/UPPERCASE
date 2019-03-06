FROM uppercase:latest

MAINTAINER Hanul <hanul@hanul.me>

COPY mongodb-org-4.0.repo /etc/yum.repos.d/mongodb-org-4.0.repo
RUN yum install -y mongodb-org

VOLUME /data

RUN mkdir /data/db

RUN mongod --port 27018 --fork --logpath /var/log/mongodb.log --logappend
RUN mongo --port 27018 --eval "use admin; db.createUser({ user : '${MONGO_ROOT_USERNAME}', pwd : '${MONGO_ROOT_PASSWORD}', roles : ['root'] }); db.shutdownServer();"
RUN mongod --port 27018 --fork --logpath /var/log/mongodb.log --logappend --auth --bind_ip_all
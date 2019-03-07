FROM centos:7

MAINTAINER Hanul <hanul@hanul.me>

WORKDIR /root

COPY mongodb-org-4.0.repo /etc/yum.repos.d/mongodb-org-4.0.repo
RUN yum install -y mongodb-org

VOLUME /data/db

ENTRYPOINT docker-entrypoint.sh

EXPOSE 27018
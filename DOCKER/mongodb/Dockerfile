FROM centos:7

MAINTAINER Hanul <hanul@hanul.me>

WORKDIR /root

COPY mongodb-org-4.0.repo /etc/yum.repos.d
RUN yum install -y mongodb-org

VOLUME /data/db

COPY docker-entrypoint.sh /root
RUN chown root:root /root/docker-entrypoint.sh
RUN chmod 4755 /root/docker-entrypoint.sh

ENTRYPOINT "/root/docker-entrypoint.sh"

EXPOSE 27018
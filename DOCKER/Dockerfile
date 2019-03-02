FROM centos:7

MAINTAINER Hanul <hanul@hanul.me>

RUN curl -sL https://rpm.nodesource.com/setup_11.x | bash -
RUN yum install -y nodejs
RUN yum install -y ImageMagick

WORKDIR /root

RUN yum install -y git
RUN git clone https://github.com/Hanul/UPPERCASE.git
RUN export UPPERCASE_PATH=/root/UPPERCASE

EXPOSE 80
EXPOSE 443
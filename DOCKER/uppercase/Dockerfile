FROM centos:7

MAINTAINER Hanul <hanul@hanul.me>

WORKDIR /root

RUN curl -sL https://rpm.nodesource.com/setup_11.x | bash -
RUN yum install -y nodejs
RUN yum install -y ImageMagick
RUN yum install -y git

ARG CACHEBUST=1
RUN git clone https://github.com/Hanul/UPPERCASE.git
ENV UPPERCASE_PATH /root/UPPERCASE
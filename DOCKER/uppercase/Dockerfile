FROM centos:7

MAINTAINER Hanul <hanul@hanul.me>

WORKDIR /root

RUN curl -sL https://rpm.nodesource.com/setup_11.x | bash -
RUN yum install -y nodejs
RUN yum install -y ImageMagick

RUN yum install -y git
RUN git clone https://github.com/Hanul/UPPERCASE.git
RUN git -C /root/UPPERCASE pull
ENV UPPERCASE_PATH /root/UPPERCASE
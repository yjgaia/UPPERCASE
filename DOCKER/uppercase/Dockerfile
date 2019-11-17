FROM centos:8

MAINTAINER Hanul <hanul@hanul.me>

WORKDIR /root

RUN dnf install -y epel-release
RUN dnf install -y nodejs
RUN npm install -g n
RUN n lts
RUN dnf install -y GraphicsMagick GraphicsMagick-devel GraphicsMagick-perl
RUN dnf install -y git

ARG CACHEBUST=1
RUN git clone https://github.com/Hanul/UPPERCASE.git
ENV UPPERCASE_PATH /root/UPPERCASE
FROM nginx:alpine

LABEL maintainer="tiagolo@gmail.com"

COPY . /usr/share/nginx/html

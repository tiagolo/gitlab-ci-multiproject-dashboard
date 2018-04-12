FROM nginx:alpine

LABEL maintainer="tiagolo@gmail.com"

COPY dist /usr/share/nginx/html

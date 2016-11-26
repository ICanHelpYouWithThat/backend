FROM node:7.2.0

COPY . /var/www
RUN cd /var/www && npm start


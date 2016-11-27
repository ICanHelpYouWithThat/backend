FROM node:7.2.0

EXPOSE 3000

COPY . /var/www/
WORKDIR /var/www/
RUN cd /var/www; npm install; npm run build;
CMD npm run deploy


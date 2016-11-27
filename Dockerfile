FROM node:7.2.0

EXPOSE 3000

COPY . /var/www/
WORKDIR /var/www/
CMD npm run deploy


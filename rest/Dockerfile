FROM php:5.6-apache

RUN /usr/local/bin/docker-php-ext-install pdo pdo_mysql
RUN a2enmod rewrite

RUN mkdir -p /var/www/logs

RUN chmod -R 777 /var/www/logs
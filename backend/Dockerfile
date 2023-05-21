# Use a imagem base do PHP com Apache
FROM php:8.0-apache

# Copie o código-fonte do projeto para o contêiner
COPY . /var/www/html

# Defina o diretório de trabalho
WORKDIR /var/www/html

# Instale as dependências do Laravel
RUN apt-get update && apt-get install -y \
    libzip-dev zip \
    && docker-php-ext-configure zip \
    && docker-php-ext-install zip pdo_mysql

# Instale o Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Execute os comandos do Laravel
RUN cp .env.example .env
RUN composer install --no-dev --optimize-autoloader
RUN php artisan key:generate
RUN php artisan config:cache
RUN php artisan migrate --seed

# Defina as permissões corretas
RUN chown -R www-data:www-data /var/www/html/storage

# Exponha a porta 80
EXPOSE 80

# Inicie o servidor Apache
CMD ["apache2-foreground"]

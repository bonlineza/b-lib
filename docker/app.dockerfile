FROM php:7.2-fpm

# ghostscript is needed for PDF conversion
# libpq-dev is needed for missing includes for pdo_pgsql
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    ghostscript

RUN set -ex \
     && curl -sL https://deb.nodesource.com/setup_10.x | bash - \
     && apt-get update \
     && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
        nodejs

RUN npm install -g yarn


FROM composer:latest

WORKDIR /app

USER 1000:1000

ENTRYPOINT [ "composer", "--ignore-platform-reqs" ]


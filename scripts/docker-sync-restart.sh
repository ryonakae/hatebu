#!/bin/sh

# stop
docker-sync stop
docker-compose stop

# start
docker-sync start
docker-compose -f docker-compose.yml -f docker-compose-dev.yml up -d

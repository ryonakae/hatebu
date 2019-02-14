#!/bin/sh

# stop
docker-compose stop
docker-sync clean

# start
docker-sync start
docker-compose -f docker-compose.yml -f docker-compose-dev.yml up -d

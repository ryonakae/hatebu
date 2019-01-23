#!/bin/sh

# stop
docker-compose stop

# start
docker-compose -f docker-compose.yml -f docker-compose-dev.yml up -d

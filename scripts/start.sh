#!/bin/sh

docker-sync start
docker-compose -f docker-compose.yml -f docker-compose-dev.yml up -d

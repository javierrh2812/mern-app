#!/bin/sh

#fetch latest code from remote
git pull origin master

#restart app
docker-compose build react-app
docker-compose up -d



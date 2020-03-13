#!/bin/bash
set -e
npm run build api
cp auth_config_server.json ./dist/apps/api
cd ./dist/apps/api

rm -rf .git

git init
heroku git:remote -a erpjs

git add .
git commit -am "make it better"
git push heroku master --force

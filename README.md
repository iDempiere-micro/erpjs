# ERP.JS 3

## Start the database

`docker stop pg-docker; docker run --rm --name pg-docker -e POSTGRES_PASSWORD=Coggel86 -e POSTGRES_DB=gt2 -d -p 5432:5432 postgres:12`

## Keyclock

`docker run -p 8080:8080 -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin quay.io/keycloak/keycloak:11.0.2`

- erpjs `tenant`
- erpjs `client`
allow Valid Redirect URIs: `http://localhost:5000/*`
allow Web Origins: `+`

or import the realm from docs folder

## .env file
Current ip address on macos: `ipconfig getifaddr en0`


## Deploy to dokku

### Prerequisites

on the Dokku host install the postgres plugin plugin installation requires root, hence the user change
`sudo dokku plugin:install https://github.com/dokku/dokku-postgres.git`
on the Dokku host
`dokku apps:create erpjs-api`
create a postgres service with the name erpjs
`dokku postgres:create erpjs`
# each official datastore offers a `link` method to link a service to any application
`dokku postgres:link erpjs erpjs-api`

### Build and deploy API
`yarn build api`
`cd dist`
`git remote add dokku dokku@dokku.me:erpjs-api`
`git add .`
`git commit -am "make it better"`
`git push dokku master:master --force`


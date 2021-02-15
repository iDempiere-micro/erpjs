# ERP.JS 3

## Start the database

`docker stop pg-docker; docker run --rm --name pg-docker -e POSTGRES_PASSWORD=Coggel86 -e POSTGRES_DB=gt2 -d -p 5432:5432 postgres:12`

### Generate migrations

1. change `nest-cli.json` to `"webpack": false,`
2. `yarn build api`
3.  `yarn typeorm-migration-generate MIGRATION_NAME`
4. change `nest-cli.json` to `"webpack": true,`

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

Create erpjs app

`dokku apps:create erpjs-api`

`dokku postgres:create erpjs`

`dokku postgres:link erpjs erpjs-api`

Create Keycloak app

`dokku apps:create keycloak`

`dokku postgres:create keycloakdatabase`

`dokku postgres:link keycloakdatabase keycloak`

Set the admin user name and password

`dokku config:set keycloak KEYCLOAK_USER=admin KEYCLOAK_PASSWORD=admin`

Set port forwarding for nginx SSL ??? NO
`dokku config:set keycloak PROXY_ADDRESS_FORWARDING=true`

Deploy Keycloak app (better https://github.com/davidpodhola/keycloak-dokku)

`git clone https://github.com/mieckert/keycloak-heroku.git`

`cd keycloak-heroku`

`git remote add dokku dokku@dokku.me:keycloak`

`git push dokku master:master`

Add let's encrypt, make sure you have the correct IP address for the deployment

After HTTPS is working, make sure to change the Frontend URL for all the realms in Keycloak to something 
like https://keycloak.app.naseukoly.cz/auth/.

### setup API

Set the Keycloak URL (without the trailing slash!), real and the Technical user for the first migrations

`dokku config:set erpjs-api TECHNICAL_USER_EMAIL=test@podhola.net KEYCLOAK_BASE_URL=https://dokku.me:49153/auth KEYCLOAK_REALM=erpjs`

Add SSL

`dokku certs:generate erpjs-api erpjs-api.dokku.me`



(if you need to remove the pg database)

`dokku postgres:unlink erpjs erpjs-api`

`dokku postgres:destroy erpjs`

### Build and deploy API
`yarn build api`

`cd dist`

`yarn`

`cd ..`

`yarn rimraf dist\node_modules`

`cd dist`

`git init`

`git remote add dokku dokku@dokku.me:erpjs-api`

`git add .`

`git commit -am "make it better"`

`git push dokku master:master --force`

### Build and deploy Web Admin

`dokku apps:create erpjs`

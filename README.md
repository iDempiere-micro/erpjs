# [MaeERP  - the headless serverless ERP and CRM for the cloud](https://github.com/iDempiere-micro/erpjs/wiki)

This is the source code of MaeERP, the headless serverless ERP and CRM for the cloud 
written in TypeScript running on [Node.js](https://nodejs.org/en/) and 
in a browser as an [Svelte](https://svelte.dev/) single page application. 

It can run on your local computer, in a containerized environment like Kubernetes (K8) 
on Google Cloud, Microsoft Azure or IBM Cloud or even as a serverless function in AWS. 

[Keycloak](https://www.keycloak.org/), Open Source Identity and Access Management is used for the authentication 
so you can even get advanced features such as User Federation, Identity Brokering and Social Login.

You can download the source code and own the ERP&CRM.
You can explore the source code and find out how we used [NestJS](https://nestjs.com/), 
[TypeORM](https://typeorm.io/#/), [GraphQL](https://www.apollographql.com/) and [Svelte](https://svelte.dev/) 
to both build the backend that can run in [AWS Lambda](https://aws.amazon.com/lambda/) and 
a sample frontend application that can be immediately used to run a business.

You can run the ERP&CRM in your own cloud provided by AWS and both keep your data safe and prevent bad things 
happening by having all your important data on your laptop or own server.

### API server
The main backend serving the [GraphQL](https://graphql.org/) requests from the client 
and running jobs like invoicing, downloading currency rates etc. Stored in `apps/api`.

The default implementation uses [PostgreSQL](https://www.postgresql.org/), but 
any [TypeORM](https://typeorm.io/#/) supported relation database should work (MySQL, MariaDB, CockroachDB, 
Microsoft SQL Server, Oracle). 

The server is tested on [Dokku](https://dokku.com/). 

### Browser client
The sample frontend written in [Svelte](https://svelte.dev/) with [Tailwind CSS](https://tailwindcss.com/) 
calling the API using [GraphQL](https://graphql.org/).

### Mobile client
The sample mobile client written in [Svelte](https://svelte.dev/) with [NativeScript](https://nativescript.org/)
calling the API using [GraphQL](https://graphql.org/).

## Prerequisites

- Node.JS 12 for running the API server; switch with commands like `nvm use v10.18.1`
- Keyclock (you can import the sample realm by using `real-export.json` from the `docs` folder).
- for the mobile application you have [to install NativeScript](https://docs.nativescript.org/angular/start/quick-setup) e.g. `npm install -g nativescript`

## Dependencies
Run `yarn` to install the dependencies.

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

Deploy Keycloak app

`git clone https://github.com/davidpodhola/keycloak-dokku.git`

`git remote add dokku dokku@dokku.me:keycloak`

`git push dokku master:master`

Add let's encrypt, make sure you have the correct IP address for the deployment

After HTTPS is working, make sure to change the Frontend URL for all the realms in Keycloak to something 
like https://keycloak.app.naseukoly.cz/auth/.

### setup API

Set the Keycloak URL (without the trailing slash!), real and the Technical user for the first migrations

`dokku config:set erpjs-api TECHNICAL_USER_EMAIL=test@company.com KEYCLOAK_BASE_URL=https://dokku.me:49153/auth KEYCLOAK_REALM=erpjs`

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

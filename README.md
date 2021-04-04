# MaeERP  - the headless serverless ERP and CRM for the cloud

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

## Building

### Frontend
Build frontend with `AUTH0_DOMAIN=<domain>.auth0.com AUTH0_CLIENT_ID=<clientid> AUTH0_AUDIENCE='@erpjs' API='<api server url>' npm run build erp`.
Obtain the AUTH0_* variables from the [Setup Auth0 for erpjs](https://naseukolycz.atlassian.net/wiki/spaces/ERPJS/pages/363856005/Setup+Auth0+for+erpjs) guide 
for the SPA application (do not use the machine-machine API ones). 

### Other projects
Run `ng build [project name]` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running

### @erpjs API server

Run `AUTH0_DOMAIN=AAAAA.eu.auth0.com AUTH0_CLIENT_ID=CLIENTID AUTH0_CLIENT_SECRET=SECRET ng serve api` for a dev API server. 
Navigate to http://localhost:3333/api/hello. The app will automatically reload if you change any of the source files.

## @erpjs front end development server

Run `ng serve erp` for a dev server. Navigate to http://localhost:4200/. 
The app will automatically reload if you change any of the source files.

## Tests

### Running @erpjs unit tests

Run `ng test` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

### Running @erpjs end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Workspace

### Understand the @erpjs workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help on the Nx framework used

Visit the [Nx Documentation](https://nx.dev/angular) to learn more.

## Other notes

### Publish `@erpjs/model`
`ng build model`

`npm publish ~/dev/erp/dist/libs/model/ --access public`

### @erpjs and PostgreSQL
`docker pull postgres:12`

`docker stop pg-docker; docker run --rm --name pg-docker -e POSTGRES_PASSWORD=HlohIn14563 -e POSTGRES_DB=gt2 -d -p 5432:5432 postgres:12`

### serverless

set `AWS` environment variable on the lambda to `1` for the `GraphQLModule` automatic schema generation to work.

`AUTH0_DOMAIN=AAAAA.eu.auth0.com AUTH0_CLIENT_ID=CLIENTID AUTH0_CLIENT_SECRET=SECRET npm run build api-sls`

`AUTH0_DOMAIN=AAAAA.eu.auth0.com AUTH0_CLIENT_ID=CLIENTID AUTH0_CLIENT_SECRET=SECRET  cp serverless.yml ./dist/apps/api-sls/ && cp auth_config_server.json ./dist/apps/api-sls/  && (cd ./dist/apps/api-sls/ && npm i && sls deploy) `

Open [Serveless Dashboard](https://dashboard.serverless.com/), locate the `erpjs` service, find `any/` API endpoint 
and try to access `/api/hello` on the URL. 

The API is the path to the API endpoint ending with the stage (e.g. `/dev`). 
 
 
### Heroku

#### Reset the database if needed
`heroku restart --app erpjs && heroku pg:reset DATABASE --app erpjs`

#### Deploy
`AUTH0_DOMAIN=AAAAA.eu.auth0.com AUTH0_CLIENT_ID=CLIENTID AUTH0_CLIENT_SECRET=SECRET ./heroku_deploy_api.sh`

#### Test
Access [the health check](https://erpjs.herokuapp.com/health).
The API is `https://erpjs.herokuapp.com`.

### Mobile client
Run `npm run start.nativescript.mobile.android`.

#### Deploy
If you have `Signing for "nativescriptmobile" requires a development team.` you need 
to go to the project Targets and choose the team (you need to create the development team in advance).

![Choose the team](https://user-images.githubusercontent.com/436605/74342379-4f13ea00-4da1-11ea-8b93-264eedfeb3e4.png)

#### Untrusted developer
When running on the real device, you will get the error about `Untrusted developer`.
Go to Setting -> General -> Device Management and "Trust" the developer used.

if the "Device Management" option is not present, reinstall the application.

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

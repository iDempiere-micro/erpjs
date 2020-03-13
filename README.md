# @erpjs  - the headless serverless ERP and CRM for the cloud

This is the source code of the [erpjs](http://erpjs.eu), the headless serverless ERP and CRM for the cloud 
written in TypeScript running on [Node.js](https://nodejs.org/en/) and 
in a browser as an [Angular](https://angular.io/) single page application. 

It can run on your local computer, in a containerized environment like Kubernetes (K8) 
on Google Cloud, Microsoft Azure or IBM Cloud or even as a serverless function in AWS. 

[Auth0](https://auth0.com/) is used for the authentication so with paid plans you can achieve Single Sign On 
with G Suite, Office 365 or Salesforce.com (SFDC) while still running free on the plain old username + password.

You can download the source code and own the ERP&CRM.
You can explore the source code and find out how we used [Nx](https://nx.dev/), [NestJS](https://nestjs.com/), 
[TypeORM](https://typeorm.io/#/), [GraphQL](https://www.apollographql.com/) and [Angular](https://angular.io/) 
to both build the backend that can run in [AWS Lambda](https://aws.amazon.com/lambda/) and 
a sample frontend application that can be immediately used to run a business.

You can run the ERP&CRM in your own cloud provided by AWS and both keep your data safe and prevent bad things 
happening by having all your important data on your laptop or own server.

![adding task sample](https://user-images.githubusercontent.com/436605/69057342-93ddee00-0a09-11ea-9b81-9531ab71bcca.gif)      

## Content of the repository
This is a monorepo of the erpjs API server (backend) and a sample Angular web client (frontend) together with some
libraries like [@erpjs/model](https://www.npmjs.com/package/@erpjs/model), the business core of erpjs.

### [@erpjs/model](https://www.npmjs.com/package/@erpjs/model)
This is the business core of the ERP/CRM. Stored in `libs/model`:
 
- **services** (e.g. `BankAccountService` or `LeadService`). The services contains the core business logic like: 
    
    - `SalesInvoiceService` makes sure VATs are applied if necessary, the grand total is rounded and is ready 
    to be posted with the correct currency rate
    
    -  `ProspectService` correctly converts `SuspectModel` to `ProspectModel` when needed
    
- **entity interfaces** (e.g. `AccountModel` or `CustomerModel` ). What are the basic minimum attributes entities need to have.

- **jobs** (e.g. `SalesInvoiceJob`). Repeatable jobs that e.g. assign document numbers to invoices.

- **args**. The interface for a new entity to be created through the service.

- **Injector** to be able to make calls between services. 

This library contains only the business code, no persistence, minimum dependencies.
Never import like `import { ... } from '@erp/model` here, always use the relative paths or the `@erpjs/model`
will not build.

### @erpjs/data
This is the implementation of @erpjs/model in [NestJS](https://nestjs.com/).
Implements the entity persistence using [TypeORM](https://typeorm.io/#/).

### @erpjs API server
The main backend serving the [GraphQL](https://graphql.org/) requests from the client 
and running jobs like invoicing, downloading currency rates etc. Stored in `apps/api`.

The default implementation uses [PostgreSQL](https://www.postgresql.org/), but 
any [TypeORM](https://typeorm.io/#/) supported relation database should work (MySQL, MariaDB, CockroachDB, 
Microsoft SQL Server, Oracle). 

The server is tested on [Heroku](https://www.heroku.com/) and [AWS Lambda](https://aws.amazon.com/lambda/). 

### @erpjs Angular client
The sample frontend written in [Angular](https://angular.io/) with [Clarity Design System](https://clarity.design/) 
calling the API using [GraphQL](https://graphql.org/).

## Prerequisities

- Node.JS 10 for running the API server; switch with commands like `nvm use v10.18.1`, also note we are now not node 13.5 compatible 
- Auth0 tenant created and setup following [Setup Auth0 for erpjs](https://naseukolycz.atlassian.net/wiki/spaces/ERPJS/pages/363856005/Setup+Auth0+for+erpjs).
- for the mobile application you have [to install NativeScript](https://docs.nativescript.org/angular/start/quick-setup) e.g. `npm install -g nativescript`

## Dependencies
Run `npm i` to install the dependencies.

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

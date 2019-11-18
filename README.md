# @erpjs  - the headless serverless ERP and CRM for the cloud.

This is the source code of the [erpjs](http://erpjs.eu), the headless serverless ERP and CRM for the cloud.

You can download the source code and own the ERP&CRM.
You can explore the source code and find out how we used [Nx](https://nx.dev/), [NestJS](https://nestjs.com/), 
[TypeORM](https://typeorm.io/#/), [GraphQL](https://www.apollographql.com/) and [Angular](https://angular.io/) 
to both build the backend that can run in [AWS Lambda](https://aws.amazon.com/lambda/) and 
a sample frontend application that can be immediately used to run a business.
You can run the ERP&CRM in your own cloud provided by AWS and both keep your data safe and prevent bad things 
happening by having all your important data on your laptop or own server.

![adding task sample](https://user-images.githubusercontent.com/436605/69057342-93ddee00-0a09-11ea-9b81-9531ab71bcca.gif)      

## @erpjs API server

Run `AUTH0_DOMAIN=AAAAA.eu.auth0.com AUTH0_CLIENT_ID=CLIENTID AUTH0_CLIENT_SECRET=SECRET ng serve api` for a dev API server. Navigate to http://localhost:3333/api/hello. The app will automatically reload if you change any of the source files.

## @erpjs front end development server

Run `ng serve erp` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Build @erpjs

Run `ng build [project name]` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running @erpjs unit tests

Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running @erpjs end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand the @erpjs workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help on the Nx framework used

Visit the [Nx Documentation](https://nx.dev/angular) to learn more.

## Publish `@erpjs/model`
`ng build model`

`npm publish ~/dev/erp/dist/libs/model/ --access public`

## @erpjs and PostgreSQL
Note: we are NOT Postgres 12 compatible yet please see [typeorm/issues/4332](https://github.com/typeorm/typeorm/issues/4332).
Use Postgres 11 till the TypeORM issue is solved.
 
`docker pull postgres:11`

`docker stop pg-docker; docker run --rm --name pg-docker -e POSTGRES_PASSWORD=HlohIn14563 -e POSTGRES_DB=gt2 -d -p 5432:5432 postgres:11`

## serverless

set `AWS` environment variable on the lambda to `1` for the `GraphQLModule` automatic schema generation to work.

`AUTH0_DOMAIN=AAAAA.eu.auth0.com AUTH0_CLIENT_ID=CLIENTID AUTH0_CLIENT_SECRET=SECRET npm start build api-sls`

`cp serverless.yml ./dist/apps/api-sls/ && cp auth_config_server.json ./dist/apps/api-sls/  && (cd ./dist/apps/api-sls/ && npm i && sls deploy) `
 
## Build the frontend

`AUTH0_DOMAIN=DOMAIN AUTH0_CLIENT_ID=CLIENTID AUTH0_AUDIENCE=AUDIENCE npm run build`

## Heroku
`AUTH0_DOMAIN=AAAAA.eu.auth0.com AUTH0_CLIENT_ID=CLIENTID AUTH0_CLIENT_SECRET=SECRET ./heroku_deploy_api.sh`



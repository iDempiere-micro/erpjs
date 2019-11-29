# @erpjs  - the headless serverless ERP and CRM for the cloud - the business core

This package contains the business core of erpjs  - the headless serverless ERP and CRM for the cloud.
erpjs can run on your local computer, in a containerized environment like Kubernetes (K8) 
on Google Cloud, Microsoft Azure or IBM Cloud or even as a serverless function in AWS. 

The library has only two `peerDependencies` so you can easily base your own CRM or 
ERP on the top of the package and use the ORM or REST etc. libraries you like.

This library contains only the business code, no persistence, minimum dependencies:
 
- **services** (e.g. `BankAccountService` or `LeadService`). The services contains the core business logic like: 
    
    - `SalesInvoiceService` makes sure VATs are applied if necessary, the grand total is rounded and is ready 
    to be posted with the correct currency rate
    -  `ProspectService` correctly converts `SuspectModel` to `ProspectModel` when needed
- **entity interfaces** (e.g. `AccountModel` or `CustomerModel` ). What are the basic minimum attributes entities need to have.
- **jobs** (e.g. `SalesInvoiceJob`). Repeatable jobs that e.g. assign document numbers to invoices.
- **args**. The interface for a new entity to be created through the service.
- **[Injector](https://htmlpreview.github.io/?https://raw.githubusercontent.com/iDempiere-micro/erpjs/master/docs/interfaces/injector.html)** to be able to make calls between services. 

If you are looking for a bigger example, please have a look at [iDempiere-micro/erpjs](https://github.com/iDempiere-micro/erpjs).
It contains the monorepo of the erpjs API server (backend) and a sample Angular web client (frontend) together with some
libraries like [@erpjs/model](https://www.npmjs.com/package/@erpjs/model), the business core of erpjs.
   

![adding task sample](https://user-images.githubusercontent.com/436605/69057342-93ddee00-0a09-11ea-9b81-9531ab71bcca.gif)

## Documentation
The documentation is available at [Docs](http://htmlpreview.github.io/?https://github.com/iDempiere-micro/erpjs/blob/master/docs/index.html).


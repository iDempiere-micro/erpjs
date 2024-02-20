import AddBank from './pages/AddBank.svelte';
import AddCountry from './pages/AddCountry.svelte';
import AddCurrency from './pages/AddCurrency.svelte';
import AddCustomer from './pages/AddCustomer.svelte';
import AddProduct from './pages/AddProduct.svelte';
import AddSalesInvoice from './pages/AddSalesInvoice.svelte';
import BankDetail from './pages/BankDetail.svelte';
import Banks from './pages/Banks.svelte';
import Countries from './pages/Countries.svelte';
import CountryDetail from './pages/CountryDetail.svelte';
import Currencies from './pages/Currencies.svelte';
import CurrencyDetail from './pages/CurrencyDetail.svelte';
import CustomerDetail from './pages/CustomerDetail.svelte';
import Customers from './pages/Customers.svelte';
import EditBank from './pages/EditBank.svelte';
import EditCountry from './pages/EditCountry.svelte';
import EditCurrency from './pages/EditCurrency.svelte';
import EditCustomer from './pages/EditCustomer.svelte';
import EditProduct from './pages/EditProduct.svelte';
import EditSalesInvoice from './pages/EditSalesInvoice.svelte';
import Home from './pages/Home.svelte';
import Lists from './pages/Lists.svelte';
import { segments, urls } from './pages/pathAndSegment';
import ProductDetail from './pages/ProductDetail.svelte';
import Products from './pages/Products.svelte';
import SalesInvoiceDetail from './pages/SalesInvoiceDetail.svelte';
import SalesInvoicePublish from './pages/SalesInvoicePublish.svelte';
import SalesInvoices from './pages/SalesInvoices.svelte';

import AddOrganization from './pages/AddOrganization.svelte';
import EditOrganization from './pages/EditOrganization.svelte';
import OrganizationDetail from './pages/OrganizationDetail.svelte';
import Organizations from './pages/Organizations.svelte';

import AccountingSchemeDetail from './pages/AccountingSchemeDetail.svelte';
import AccountingSchemes from './pages/AccountingSchemes.svelte';
import AddAccountingScheme from './pages/AddAccountingScheme.svelte';
import AddCustomerGroup from './pages/AddCustomerGroup.svelte';
import CustomerGroupDetail from './pages/CustomerGroupDetail.svelte';
import CustomerGroups from './pages/CustomerGroups.svelte';
import EditAccountingScheme from './pages/EditAccountingScheme.svelte';
import EditCustomerGroup from './pages/EditCustomerGroup.svelte';

import AddFactoringProvider from './pages/AddFactoringProvider.svelte';
import EditFactoringProvider from './pages/EditFactoringProvider.svelte';
import FactoringProviderDetail from './pages/FactoringProviderDetail.svelte';
import FactoringProviders from './pages/FactoringProviders.svelte';

import AddFactoringContract from './pages/AddFactoringContract.svelte';
import EditFactoringContract from './pages/EditFactoringContract.svelte';
import FactoringContractDetail from './pages/FactoringContractDetail.svelte';
import FactoringContracts from './pages/FactoringContracts.svelte';

import AddAttachment from './pages/AddAttachment.svelte';
import AttachmentDetail from './pages/AttachmentDetail.svelte';
import Attachments from './pages/Attachments.svelte';
import EditAttachment from './pages/EditAttachment.svelte';

export const routes = {
    // Exact path
    '/': Home,
    /*
    // Using named parameters, with last being optional
    '/author/:first/:last?': Author,

    // Wildcard parameter
    '/book/*': Book,

    // Catch-all
    // This is optional, but if present it must be the last
    '*': NotFound,
    */
};
const addRoute = (path: string, component: any) => {
    (routes as any)[`/${path}`] = component;
};

addRoute(segments.customers, Customers);
addRoute(urls.customer.add, AddCustomer);
addRoute(urls.customer.edit, EditCustomer);
addRoute(urls.customer.detail, CustomerDetail);
addRoute(urls.salesInvoices.list, SalesInvoices);
addRoute(urls.salesInvoices.edit, EditSalesInvoice);
addRoute(urls.salesInvoices.detail, SalesInvoiceDetail);
addRoute(urls.salesInvoices.publish, SalesInvoicePublish);
addRoute(urls.settings.list, Lists);
addRoute(urls.products.list, Products);
addRoute(urls.products.edit, EditProduct);
addRoute(urls.products.add, AddProduct);
addRoute(urls.products.detail, ProductDetail);
addRoute(urls.salesInvoices.add, AddSalesInvoice);
addRoute(urls.countries.list, Countries);
addRoute(urls.countries.edit, EditCountry);
addRoute(urls.countries.add, AddCountry);
addRoute(urls.countries.detail, CountryDetail);
addRoute(urls.currencies.list, Currencies);
addRoute(urls.currencies.edit, EditCurrency);
addRoute(urls.currencies.add, AddCurrency);
addRoute(urls.currencies.detail, CurrencyDetail);
addRoute(urls.banks.list, Banks);
addRoute(urls.banks.edit, EditBank);
addRoute(urls.banks.add, AddBank);
addRoute(urls.banks.detail, BankDetail);
addRoute(urls.organizations.list, Organizations);
addRoute(urls.organizations.edit, EditOrganization);
addRoute(urls.organizations.add, AddOrganization);
addRoute(urls.organizations.detail, OrganizationDetail);
addRoute(urls.accountingSchemes.list, AccountingSchemes);
addRoute(urls.accountingSchemes.edit, EditAccountingScheme);
addRoute(urls.accountingSchemes.add, AddAccountingScheme);
addRoute(urls.accountingSchemes.detail, AccountingSchemeDetail);
addRoute(urls.customerGroups.list, CustomerGroups);
addRoute(urls.customerGroups.edit, EditCustomerGroup);
addRoute(urls.customerGroups.add, AddCustomerGroup);
addRoute(urls.customerGroups.detail, CustomerGroupDetail);
addRoute(urls.factoringProviders.list, FactoringProviders);
addRoute(urls.factoringProviders.edit, EditFactoringProvider);
addRoute(urls.factoringProviders.add, AddFactoringProvider);
addRoute(urls.factoringProviders.detail, FactoringProviderDetail);
addRoute(urls.factoringContracts.list, FactoringContracts);
addRoute(urls.factoringContracts.edit, EditFactoringContract);
addRoute(urls.factoringContracts.add, AddFactoringContract);
addRoute(urls.factoringContracts.detail, FactoringContractDetail);
addRoute(urls.attachments.list, Attachments);
addRoute(urls.attachments.edit, EditAttachment);
addRoute(urls.attachments.add, AddAttachment);
addRoute(urls.attachments.detail, AttachmentDetail);

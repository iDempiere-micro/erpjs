import Home from './pages/Home.svelte';
import Customers from './pages/Customers.svelte';
import AddCustomer from './pages/AddCustomer.svelte';
import Refresh from './pages/Refresh.svelte';
import AddMonthlySalesInvoice from './pages/AddMonthlySalesInvoice.svelte';
import EditCustomer from './pages/EditCustomer.svelte';
import CustomerDetail from './pages/CustomerDetail.svelte';
import SalesInvoices from './pages/SalesInvoices.svelte';
import EditSalesInvoice from './pages/EditSalesInvoice.svelte';
import SalesInvoiceDetail from './pages/SalesInvoiceDetail.svelte';
import Products from './pages/Products.svelte';
import AddProduct from './pages/AddProduct.svelte';
import EditProduct from './pages/EditProduct.svelte';
import Lists from './pages/Lists.svelte';
import AddSalesInvoice from './pages/AddSalesInvoice.svelte';
import { segments, urls } from './pages/pathAndSegment';
import Countries from './pages/Countries.svelte';
import AddCountry from './pages/AddCountry.svelte';
import EditCountry from './pages/EditCountry.svelte';
import CountryDetail from './pages/CountryDetail.svelte';
import Currencies from './pages/Currencies.svelte';
import AddCurrency from './pages/AddCurrency.svelte';
import EditCurrency from './pages/EditCurrency.svelte';
import CurrencyDetail from './pages/CurrencyDetail.svelte';
import Banks from './pages/Banks.svelte';
import AddBank from './pages/AddBank.svelte';
import EditBank from './pages/EditBank.svelte';

import Organizations from './pages/Organizations.svelte';
import AddOrganization from './pages/AddOrganization.svelte';
import EditOrganization from './pages/EditOrganization.svelte';

import AccountingSchemes from './pages/AccountingSchemes.svelte';
import AddAccountingScheme from './pages/AddAccountingScheme.svelte';
import EditAccountingScheme from './pages/EditAccountingScheme.svelte';
import AccountingSchemeDetail from './pages/AccountingSchemeDetail.svelte';

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
addRoute(urls.refresh, Refresh);
addRoute(urls.salesInvoices.monthly.add, AddMonthlySalesInvoice);
addRoute(urls.customer.edit, EditCustomer);
addRoute(urls.customer.detail, CustomerDetail);
addRoute(urls.salesInvoices.list, SalesInvoices);
addRoute(urls.salesInvoices.edit, EditSalesInvoice);
addRoute(urls.salesInvoices.detail, SalesInvoiceDetail);
addRoute(urls.settings.list, Lists);
addRoute(urls.products.list, Products);
addRoute(urls.products.edit, EditProduct);
addRoute(urls.products.add, AddProduct);
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
addRoute(urls.organizations.list, Organizations);
addRoute(urls.organizations.edit, EditOrganization);
addRoute(urls.organizations.add, AddOrganization);
addRoute(urls.accountingSchemes.list, AccountingSchemes);
addRoute(urls.accountingSchemes.edit, EditAccountingScheme);
addRoute(urls.accountingSchemes.add, AddAccountingScheme);
addRoute(urls.accountingSchemes.detail, AccountingSchemeDetail);

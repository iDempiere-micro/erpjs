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
import { segments, urls } from './pages/pathAndSegment';
import Countries from './pages/Countries.svelte';
import AddCountry from './pages/AddCountry.svelte';
import EditCountry from './pages/EditCountry.svelte';
import CountryDetail from './pages/CountryDetail.svelte';

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
addRoute(urls.countries.list, Countries);
addRoute(urls.countries.edit, EditCountry);
addRoute(urls.countries.add, AddCountry);
addRoute(urls.countries.detail, CountryDetail);

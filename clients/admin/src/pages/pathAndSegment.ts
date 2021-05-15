import { push as pushToRouter } from 'svelte-spa-router';

export const urls = {
    customer: {
        add: 'add-customer',
        edit: 'customer/:id',
        detail: 'customer-detail/:id',
        list: 'customers',
    },
    salesInvoices: {
        list: 'sales-invoices',
        add: 'create-sales-invoice',
        detail: 'sales-invoice-detail/:id',
        edit: 'sales-invoice/:id',
        monthly: {
            add: 'add-monthly-sales-invoice',
        },
        publish: 'sales-invoice-publish/:id',
    },
    products: {
        list: 'products',
        add: 'add-product',
        edit: 'product/:id',
        detail: 'product-detail/:id',
    },
    settings: {
        list: 'settings',
    },
    countries: {
        list: 'countries',
        add: 'add-country',
        edit: 'country/:id',
        detail: 'country-detail/:id',
    },
    currencies: {
        list: 'currencies',
        add: 'add-currency',
        edit: 'currency/:id',
        detail: 'currency-detail/:id',
    },
    banks: {
        list: 'banks',
        add: 'add-bank',
        edit: 'bank/:id',
        detail: 'bank-detail/:id',
    },
    organizations: {
        list: 'organizations',
        add: 'add-organization',
        edit: 'organization/:id',
        detail: 'organization-detail/:id',
    },
    accountingSchemes: {
        list: 'accountingSchemes',
        add: 'add-accountingScheme',
        edit: 'accountingScheme/:id',
        detail: 'accountingScheme-detail/:id',
    },
    customerGroups: {
        list: 'customerGroups',
        add: 'add-customerGroup',
        edit: 'customerGroup/:id',
        detail: 'customerGroup-detail/:id',
    },
    factoringProviders: {
        list: 'factoringProviders',
        add: 'add-factoringProvider',
        edit: 'factoringProvider/:id',
        detail: 'factoringProvider-detail/:id',
    },
    factoringContracts: {
        list: 'factoringContracts',
        add: 'add-factoringContract',
        edit: 'factoringContract/:id',
        detail: 'factoringContract-detail/:id',
    },
    attachments: {
        list: 'attachments',
        add: 'add-attachments',
        edit: 'attachment/:id',
        detail: 'attachment-detail/:id',
    },
};

export const segments = {
    customers: urls.customer.list,
    salesInvoices: urls.salesInvoices.list,
    products: urls.products.list,
    lists: urls.settings.list,
    countries: urls.countries.list,
    currencies: urls.currencies.list,
    banks: urls.banks.list,
    organizations: urls.organizations.list,
    accountingSchemes: urls.accountingSchemes.list,
    customerGroups: urls.customerGroups.list,
    factoringProviders: urls.factoringProviders.list,
    factoringContracts: urls.factoringContracts.list,
    attachments: urls.attachments.list,
};

export const push = (urlPattern: string, id: number | string | undefined) =>
    pushToRouter('/' + urlPattern.replace(':id', id ? id.toString() : ''));

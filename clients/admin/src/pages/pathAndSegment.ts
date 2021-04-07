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
    },
    products: {
        list: 'products',
        add: 'add-product',
        edit: 'product/:id',
    },
    settings: {
        list: 'settings',
    },
    refresh: 'refresh',
    countries: {
        list: 'countries',
        add: 'add-country',
        edit: 'country/:id',
        detail: 'country-detail/:id',
    },
};

export const segments = {
    customers: urls.customer.list,
    salesInvoices: urls.salesInvoices.list,
    products: urls.products.list,
    lists: urls.settings.list,
    countries: urls.countries.list,
};

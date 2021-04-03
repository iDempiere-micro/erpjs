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
};

export const segments = {
    customers: urls.customer.list,
    salesInvoices: urls.salesInvoices.list,
    products: urls.products.list,
    lists: urls.settings.list,
};

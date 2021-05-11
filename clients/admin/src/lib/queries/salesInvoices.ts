import gql from 'graphql-tag';

export const mock = {
    data: {
        salesInvoices: [
            {
                id: 23,
                documentNo: 'ABCD1002',
                grandTotalAccountingSchemeCurrency: 1599.4,
            },
            {
                id: 22,
                documentNo: 'EFGH2001',
                grandTotalAccountingSchemeCurrency: 279715.05,
            },
        ],
    },
};

export const SALES_INVOICES = gql`
    {
        salesInvoices {
            id
            documentNo
            grandTotalAccountingSchemeCurrency
        }
    }
`;

import gql from 'graphql-tag';
import { FACTORING_PROVIDER_LIST_PARTS_RAW } from '../fragments/factoringProvider';
import { SALES_INVOICE_DETAIL_PARTS_RAW } from '../fragments/salesInvoice';

export const CONFIRM_SALES_INVOICE = gql`
    mutation ConfirmSalesInvoice($id: Int!) {
        confirmSalesInvoice(args: { id: $id }) {
            ${SALES_INVOICE_DETAIL_PARTS_RAW}
        }
    }
`;

export const DUPLICATE_SALES_INVOICE = gql`
    mutation DuplicateSalesInvoice($id: Int!) {
        duplicateSalesInvoice(id: $id) {
            id
        }
    }
`;

export const PUBLISH_SALES_INVOICE = gql`
    mutation PublishSalesInvoice($id: Int!, $attachmentIds: [String!]!) {
        publishSalesInvoice(args: { id: $id, attachmentIds: $attachmentIds }) {
            id
        }
    }
`;

export const mock1 = {
    data: {
        salesInvoice: {
            currency: { id: 1, isoCode: 'EUR', displayName: 'EUR', __typename: 'Currency' },
            customer: {
                id: 1,
                legalName: 'ABCD s.r.o.',
                displayName: 'ABCD',
                vatNumber: 'CZ1161566',
                invoicingEmail: 'abc@abc.com',
                legalAddress: {
                    id: 13,
                    city: 'Dfopfsk',
                    line1: 'Jsdfioj 985/8',
                    zipCode: '15551',
                    country: { id: 2, isoCode: 'CZ', __typename: 'Country' },
                    __typename: 'Address',
                },
                address: null,
                note: null,
                __typename: 'Customer',
            },
            documentNo: '20211004',
            dueDate: '2021-03-23',
            grandTotal: 61.47,
            grandTotalAccountingSchemeCurrency: 1610.15,
            id: 26,
            isActive: true,
            isCalculated: true,
            isCurrent: true,
            isDraft: false,
            issuedOn: '2021-02-28',
            lines: [
                {
                    id: 28,
                    lineOrder: 10,
                    linePrice: 50.8,
                    narration: 'ERP Licenses',
                    quantity: 4,
                    product: { id: 2, __typename: 'Product' },
                    __typename: 'SalesInvoiceLine',
                },
            ],
            organization: {
                contact: 'info@asdopkasdp.com',
                displayName: 'XYZ',
                id: 1,
                idNumber: '156464',
                legalName: 'XYZ Ltd.',
                registration: 'asdopúk dfsjsdffd ů§sfldůsdlf',
                vatNumber: 'UU1854849',
                accountingScheme: {
                    currency: { displayName: 'Kč', __typename: 'Currency' },
                    __typename: 'AccountingScheme',
                },
                __typename: 'Organization',
            },
            paymentTermInDays: 23,
            printDate: '2021-03-03',
            printed: true,
            printError: null,
            printLanguageIsoCode: 'cz',
            reverseCharge: false,
            totalLines: 50.8,
            totalLinesAccountingSchemeCurrency: 1330.71,
            transactionDate: '2021-02-28',
            vatReport: [
                {
                    id: 26,
                    vatRatePercent: 21,
                    vatTotal: 10.67,
                    vatTotalAccountingSchemeCurrency: 279.45,
                    vatTotalAccountingSchemeCurrencyRaw: 279.44826,
                    vatTotalRaw: 10.668,
                    __typename: 'SalesInvoiceVat',
                },
            ],
            __typename: 'SalesInvoice',
        },
    },
};

export const GET_SALES_INVOICE_BY_ID = gql`
    query SalesInvoiceById($id: Int!) {
        salesInvoice(id: $id) {
            ${SALES_INVOICE_DETAIL_PARTS_RAW}
        }
    }
`;
export const SAVE_SALES_INVOICE = gql`
    mutation SaveSalesInvoice(
        $id: Int
        $currencyId: Int!
        $customerId: Int!
        $issuedOn: Date!
        $lines: [SalesInvoiceLineSaveArgs!]!
        $organizationId: Int!
        $paymentTermInDays: Int!
        $transactionDate: Date!
        $factoringProviderId: Int
    ) {
        saveSalesInvoice(
            args: {
                id: $id
                currencyId: $currencyId
                customerId: $customerId
                issuedOn: $issuedOn
                lines: $lines
                organizationId: $organizationId
                paymentTermInDays: $paymentTermInDays
                transactionDate: $transactionDate
                factoringProviderId: $factoringProviderId
            }
        ) {
            id
        }
    }
`;

export const FACTORING_PROVIDER_FOR_INVOICE = gql`
    query FactoringProvidersForInvoice(
        $organizationId: Int!
        $customerId:  Int!
    ) { factoringProvidersForInvoice( args :
    {
        factoringProviderId: 0
        customerId: $customerId
        organizationId: $organizationId
        invoicePrintNote: ""
    }

    ) {
        ${FACTORING_PROVIDER_LIST_PARTS_RAW}
    }
    }
`;

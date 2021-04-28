import gql from 'graphql-tag';
import { SALES_INVOICE_DETAIL_PARTS } from '../fragments';

export const CONFIRM_SALES_INVOICE = gql`
    ${SALES_INVOICE_DETAIL_PARTS}

    mutation ConfirmSalesInvoice($id: Int!) {
        confirmSalesInvoice(args: { id: $id }) {
            ...SalesInvoiceDetailParts
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
            currency {
                id
                isoCode
                displayName
            }
            customer {
                id
                legalName
                displayName
                vatNumber
                invoicingEmail
                legalAddress {
                    id
                    city
                    line1
                    zipCode
                    country {
                        id
                        isoCode
                    }
                }
                address {
                    id
                    city
                    line1
                    zipCode
                    country {
                        id
                        isoCode
                    }
                }
                note
            }
            documentNo
            dueDate
            grandTotal
            grandTotalAccountingSchemeCurrency
            id
            isActive
            isCalculated
            isCurrent
            isDraft
            issuedOn
            lines {
                id
                lineOrder
                linePrice
                narration
                quantity
                product {
                    id
                }
            }
            organization {
                contact
                displayName
                id
                idNumber
                legalName
                registration
                vatNumber
                accountingScheme {
                    currency {
                        displayName
                    }
                }
            }
            paymentTermInDays
            printDate
            printed
            printError
            printLanguageIsoCode
            reverseCharge
            totalLines
            totalLinesAccountingSchemeCurrency
            transactionDate
            vatReport {
                id
                vatRatePercent
                vatTotal
                vatTotalAccountingSchemeCurrency
                vatTotalAccountingSchemeCurrencyRaw
                vatTotalRaw
            }
        }
    }
`;
export const ADD_SALES_INVOICE = gql`
    mutation CreateSalesInvoice(
        $id: Int
        $currencyIsoCode: String!
        $customerId: Int!
        $issuedOn: Date!
        $lines: [SalesInvoiceLineSaveArgs!]!
        $organizationId: Int!
        $paymentTermInDays: Int!
        $transactionDate: Date!
    ) {
        createSalesInvoice(
            args: {
                id: $id
                currencyIsoCode: $currencyIsoCode
                customerId: $customerId
                issuedOn: $issuedOn
                lines: $lines
                organizationId: $organizationId
                paymentTermInDays: $paymentTermInDays
                transactionDate: $transactionDate
            }
        ) {
            id
        }
    }
`;

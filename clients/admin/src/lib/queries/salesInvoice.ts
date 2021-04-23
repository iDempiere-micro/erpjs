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

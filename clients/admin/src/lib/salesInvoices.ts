import gql from 'graphql-tag';
import { query } from 'svelte-apollo';
import type { SalesInvoiceByIdQuery } from '../generated/graphql';

export const downloadInvoice = (
    baseUrl: string | undefined,
    token: string | undefined,
    id: number,
) => {
    if (!baseUrl) throw new Error('baseUrl must be specified');
    fetch(baseUrl + '/../file/sales-invoice/' + id, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((res) => res.json())
        .then((json) => {
            const a = document.createElement('a');
            a.href = `data:application/pdf;base64,${json.data}`;
            a.setAttribute('download', id + '.pdf');
            a.click();
        });
};

const GET_SALES_INVOICE_BY_ID = gql`
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

export const getSalesInvoiceBy = (id: number) =>
    query<SalesInvoiceByIdQuery>(GET_SALES_INVOICE_BY_ID, { variables: { id } });

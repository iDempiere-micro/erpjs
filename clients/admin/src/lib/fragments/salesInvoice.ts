import { PRODUCT_LIST_PARTS_RAW } from './product';
import { CURRENCY_LIST_PARTS_RAW } from './currency';
import { CUSTOMER_LIST_PARTS_RAW } from './customer';
import { FACTORING_PROVIDER_LIST_PARTS_RAW } from './factoringProvider';
import { ORGANIZATION_DETAIL_PARTS_RAW } from './organization';

export const SALES_INVOICE_LINE_DETAIL_PARTS_RAW = `
    id
    lineOrder
    linePrice
    narration
    quantity
    product {
        ${PRODUCT_LIST_PARTS_RAW}
    }
`;
export const SALES_INVOICE_VAT_DETAIL_PARTS_RAW = `
        id
        vatRatePercent
        vatTotal
        vatTotalAccountingSchemeCurrency
        vatTotalAccountingSchemeCurrencyRaw
        vatTotalRaw
`;
export const SALES_INVOICE_DETAIL_PARTS_RAW = `
        currency {
            ${CURRENCY_LIST_PARTS_RAW}
        }
        customer {
            ${CUSTOMER_LIST_PARTS_RAW}
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
            ${SALES_INVOICE_LINE_DETAIL_PARTS_RAW}
        }
        organization {
            ${ORGANIZATION_DETAIL_PARTS_RAW}
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
            ${SALES_INVOICE_VAT_DETAIL_PARTS_RAW}
        }
        factoringProvider {
            ${FACTORING_PROVIDER_LIST_PARTS_RAW}
        }        
`;

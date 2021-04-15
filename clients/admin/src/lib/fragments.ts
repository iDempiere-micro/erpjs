import gql from 'graphql-tag';

export const UNIT_OF_MEASUREMENT_DETAIL_PARTS = gql`
    fragment UnitOfMeasurementDetailParts on UnitOfMeasurement {
        id
        displayName
    }
`;

export const PRODUCT_DETAIL_PARTS = gql`
    fragment ProductDetailParts on Product {
        id
        displayName
        sku
        defaultUoM {
            ...UnitOfMeasurementDetailParts
        }
    }
`;

export const COUNTRY_DETAIL_PARTS = gql`
    fragment CountryDetailParts on Country {
        id
        displayName
        isoCode
    }
`;

export const COUNTRY_LIST_PARTS = gql`
    fragment CountryListParts on Country {
        id
        displayName
        isoCode
    }
`;

export const ADDRESS_LIST_PARTS = gql`
    ${COUNTRY_LIST_PARTS}
    fragment AddressListParts on Address {
        id
        city
        line1
        zipCode
        country {
            ...CountryListParts
        }
    }
`;

export const CUSTOMER_DETAIL_PARTS = gql`
    ${ADDRESS_LIST_PARTS}
    fragment CustomerDetailParts on Customer {
        id
        legalName
        displayName
        vatNumber
        idNumber
        invoicingEmail
        legalAddress {
            ...AddressListParts
        }
        address {
            ...AddressListParts
        }
        note
    }
`;

export const CURRENCY_LIST_PARTS = gql`
    fragment CurrencyListParts on Currency {
        id
        isoCode
        displayName
    }
`;

export const CUSTOMER_LIST_PARTS = gql`
    ${ADDRESS_LIST_PARTS}
    fragment CustomerListParts on Customer {
        id
        legalName
        displayName
        vatNumber
        invoicingEmail
        legalAddress {
            ...AddressListParts
        }
        address {
            ...AddressListParts
        }
        note
    }
`;
export const SALES_INVOICE_LINE_DETAIL_PARTS = gql`
    fragment SalesInvoiceLineDetailParts on SalesInvoiceLine {
        id
        lineOrder
        linePrice
        narration
        quantity
        product {
            id
        }
    }
`;

export const ORGANIZATION_LIST_PARTS = gql`
    fragment OrganizationListParts on Organization {
        contact
        displayName
        id
        idNumber
        legalName
        registration
        vatNumber
    }
`;
export const SALES_INVOICE_VAT_DETAIL_PARTS = gql`
    fragment SalesInvoiceVatDetailParts on SalesInvoiceVat {
        id
        vatRatePercent
        vatTotal
        vatTotalAccountingSchemeCurrency
        vatTotalAccountingSchemeCurrencyRaw
        vatTotalRaw
    }
`;

export const SALES_INVOICE_DETAIL_PARTS = gql`
    ${CURRENCY_LIST_PARTS}
    ${CUSTOMER_LIST_PARTS}
    ${SALES_INVOICE_LINE_DETAIL_PARTS}
    ${ORGANIZATION_LIST_PARTS}
    ${SALES_INVOICE_VAT_DETAIL_PARTS}
    fragment SalesInvoiceDetailParts on SalesInvoice {
        currency {
            ...CurrencyListParts
        }
        customer {
            ...CustomerListParts
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
            ...SalesInvoiceLineDetailParts
        }
        organization {
            ...OrganizationListParts
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
            ...SalesInvoiceVatDetailParts
        }
    }
`;

export const CURRENCY_DETAIL_PARTS_RAW = `
        id
        displayName
        isoCode
`;

export const CURRENCY_DETAIL_PARTS = gql`
    fragment CurrencyDetailParts on Currency {
        ${CURRENCY_DETAIL_PARTS_RAW}
    }
`;

export const BANK_DETAIL_PARTS = gql`
    fragment BankDetailParts on Bank {
        id
        displayName
        bankIdentifierCode
    }
`;

export const BANK_LIST_PARTS = gql`
    fragment BankListParts on Bank {
        id
        displayName
        bankIdentifierCode
    }
`;

export const BANK_ACCOUNT_LIST_PARTS = gql`
    ${BANK_LIST_PARTS}
    fragment BankAccountListParts on BankAccount {
        id
        displayName
        bank {
            ...BankListParts
        }
        bankAccountCustomerPrintableNumber
        iban
        swift
    }
`;

export const ORGANIZATION_DETAIL_PARTS = gql`
    ${ADDRESS_LIST_PARTS}
    ${BANK_ACCOUNT_LIST_PARTS}
    fragment OrganizationDetailParts on Organization {
        id
        displayName
        legalAddress {
            ...AddressListParts
        }
        legalName
        registration
        contact
        idNumber
        vatNumber
        bankAccount {
            ...BankAccountListParts
        }
    }
`;

export const ACCOUNTING_SCHEME_DETAIL_PARTS_RAW = `
    id
    displayName
    currency {
        ${CURRENCY_DETAIL_PARTS_RAW}
    }
`;

export const ACCOUNTING_SCHEME_DETAIL_PARTS = gql`
    fragment AccountingSchemeDetailParts on AccountingScheme {
    ${ACCOUNTING_SCHEME_DETAIL_PARTS_RAW}
}
`;

import gql from 'graphql-tag';

export const CUSTOMER_GROUP_LIST_PARTS_RAW = `
    id
    displayName
`;

export const CUSTOMER_GROUP_LIST_PARTS = gql`
    fragment CustomerGroupListParts on CustomerGroup {
        ${CUSTOMER_GROUP_LIST_PARTS_RAW}
    }
`;

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

export const COUNTRY_LIST_PARTS_RAW = `
        id
        displayName
        isoCode
`;

export const COUNTRY_LIST_PARTS = gql`
    fragment CountryListParts on Country {
        ${COUNTRY_LIST_PARTS_RAW}
    }
`;

export const ADDRESS_LIST_PARTS_RAW = `
        id
        city
        line1
        zipCode
        country {
            ${COUNTRY_LIST_PARTS_RAW}
        }
`;

export const ADDRESS_LIST_PARTS = gql`
    fragment AddressListParts on Address {
        ${ADDRESS_LIST_PARTS_RAW}
    }
`;

export const CUSTOMER_DETAIL_PARTS_RAW = `    
        id
        legalName
        displayName
        vatNumber
        idNumber
        invoicingEmail
        legalAddress {
            ${ADDRESS_LIST_PARTS_RAW}
        }
        address {
            ${ADDRESS_LIST_PARTS_RAW}
        }
        note
        customerGroup {
            ${CUSTOMER_GROUP_LIST_PARTS_RAW}
        }        
        www
        publicNote        
`;

export const CUSTOMER_DETAIL_PARTS = gql`
    ${ADDRESS_LIST_PARTS}
    ${CUSTOMER_GROUP_LIST_PARTS}
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
        customerGroup {
            ...CustomerGroupListParts
        }
    }
`;

export const CURRENCY_LIST_PARTS_RAW = `
        id
        isoCode
        displayName
`;

export const CURRENCY_LIST_PARTS = gql`
    fragment CurrencyListParts on Currency {
        ${CURRENCY_LIST_PARTS_RAW}
    }
`;

export const CUSTOMER_LIST_PARTS_RAW = `
        id
        legalName
        displayName
        vatNumber
        invoicingEmail
        legalAddress {
            ${ADDRESS_LIST_PARTS_RAW}
        }
        address {
            ${ADDRESS_LIST_PARTS_RAW}
        }
        note
`;

export const CUSTOMER_LIST_PARTS = gql`
    ${ADDRESS_LIST_PARTS}
    fragment CustomerListParts on Customer {
        ${CUSTOMER_LIST_PARTS_RAW}
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

export const BANK_LIST_PARTS_RAW = `
        id
        displayName
        bankIdentifierCode
`;

export const BANK_LIST_PARTS = gql`
    fragment BankListParts on Bank {
        ${BANK_LIST_PARTS_RAW}
    }
`;

export const BANK_ACCOUNT_LIST_PARTS_RAW = `
        id
        displayName
        bank {
            ${BANK_LIST_PARTS_RAW}
        }
        bankAccountCustomerPrintableNumber
        iban
        swift
`;

export const BANK_ACCOUNT_LIST_PARTS = gql`
    fragment BankAccountListParts on BankAccount {
        ${BANK_ACCOUNT_LIST_PARTS_RAW}
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

export const ORGANIZATION_DETAIL_PARTS = gql`
    ${ADDRESS_LIST_PARTS}
    ${BANK_ACCOUNT_LIST_PARTS}
    ${ACCOUNTING_SCHEME_DETAIL_PARTS}
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
        accountingScheme {
            ...AccountingSchemeDetailParts
        }
    }
`;

export const PRODUCT_LIST_PARTS_RAW = `
    id
    sku
    displayName
`;

export const PRODUCT_PRICES_LIST_PARTS_RAW = `
    id
    sellingPrice
    product {
        ${PRODUCT_LIST_PARTS_RAW}
    }
    currency {
        ${CURRENCY_LIST_PARTS_RAW}
    }
`;

export const CUSTOMER_PRICE_LIST_PARTS_RAW = `
    id
    displayName
    validFrom
    validTo
    productPrices {
        ${PRODUCT_PRICES_LIST_PARTS_RAW}
    }    
`;

export const CUSTOMER_GROUP_DETAIL_PARTS_RAW = `
    id
    displayName
    customers {
        ${CUSTOMER_LIST_PARTS_RAW}
    }
    customerPriceLists {
        ${CUSTOMER_PRICE_LIST_PARTS_RAW}
    }
`;

export const CUSTOMER_GROUP_DETAIL_PARTS = gql`
    fragment CustomerGroupDetailParts on CustomerGroup {
        ${CUSTOMER_GROUP_DETAIL_PARTS_RAW}
    }
`;

export const FACTORING_PROVIDER_DETAIL_PARTS_RAW = `
        id
        displayName
        legalName
        contact
        bankAccount {
            ${BANK_ACCOUNT_LIST_PARTS_RAW}
        }  
`;

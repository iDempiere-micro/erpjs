<script lang="ts">
    import Select from 'svelte-select';
    import SimpleTextBox from '../../molecules/form/SimpleTextBox.svelte';
    import { form } from 'svelte-forms';
    import type {
        SalesInvoiceDetailPartsFragment,
        SalesInvoiceLineSaveArgs,
        CreateSalesInvoiceMutation,
        CreateSalesInvoiceMutationVariables,
    } from '../../generated/graphql';
    import DataGrid from '../../molecules/datagrid/Datagrid.svelte';
    import QuantityColumn from './QuantityColumn.svelte';
    import LinePriceColumn from './LinePriceColumn.svelte';
    import NarrationColumn from './NarrationColumn.svelte';
    import ProductColumn from './ProductColumn.svelte';
    import type { Column, RowAction } from '../../molecules/datagrid/types';
    import { currenciesStore, ensureCurrenciesStore } from '../../lib/currency';
    import { mapCurrencies } from '../../lib/currency';
    import { ensureProductsStore } from '../../lib/product';
    import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core';
    import {
        ensureOrganizationsStore,
        mapOrganizations,
        organizationsStore,
    } from '../../lib/organization';
    import gql from 'graphql-tag';
    import { mutation } from 'svelte-apollo';
    import * as R from 'ramda';
    import { customersStore, ensureCustomersStore, mapCustomers } from '../../lib/customers';
    import type { OnSelectParam, SelectItem } from '../../lib/select';

    export let salesInvoice: SalesInvoiceDetailPartsFragment | undefined;
    export let client: ApolloClient<NormalizedCacheObject>;

    const ADD_SALES_INVOICE = gql`
        mutation CreateSalesInvoice(
            $id: Int
            $currencyIsoCode: String!
            $customerDisplayName: String!
            $issuedOn: Date!
            $lines: [SalesInvoiceLineSaveArgs!]!
            $organizationDisplayName: String!
            $paymentTermInDays: Int!
            $transactionDate: Date!
        ) {
            createSalesInvoice(
                args: {
                    id: $id
                    currencyIsoCode: $currencyIsoCode
                    customerDisplayName: $customerDisplayName
                    issuedOn: $issuedOn
                    lines: $lines
                    organizationDisplayName: $organizationDisplayName
                    paymentTermInDays: $paymentTermInDays
                    transactionDate: $transactionDate
                }
            ) {
                id
            }
        }
    `;

    export const addSalesInvoice = mutation<
        CreateSalesInvoiceMutation,
        CreateSalesInvoiceMutationVariables
    >(ADD_SALES_INVOICE);

    const createSalesInvoice = async () => {
        if (
            organizationDisplayName &&
            customerDisplayName &&
            currencyIsoCode &&
            paymentTermInDays
        ) {
            paymentTermInDays = +paymentTermInDays;
            const { data } = await addSalesInvoice({
                variables: {
                    id: salesInvoice?.id,
                    currencyIsoCode,
                    customerDisplayName,
                    issuedOn,
                    lines: lines.map((line) => ({
                        lineOrder: line.lineOrder,
                        linePrice: line.linePrice,
                        lineTaxIsStandard: true,
                        narration: line.narration,
                        productId: line.productId,
                        quantity: line.quantity,
                    })),
                    organizationDisplayName,
                    paymentTermInDays,
                    transactionDate,
                },
            });
            console.log('*** invoice created', data?.createSalesInvoice?.id);
        }
    };

    ensureCurrenciesStore();
    ensureProductsStore();
    ensureCustomersStore();
    ensureOrganizationsStore();

    let currencyIsoCode = salesInvoice?.currency?.isoCode;
    let customerDisplayName = salesInvoice?.customer?.displayName;
    let organizationDisplayName = salesInvoice?.organization?.displayName;
    let issuedOn = salesInvoice?.issuedOn;
    let transactionDate = salesInvoice?.transactionDate;
    let paymentTermInDays: number | undefined = salesInvoice?.paymentTermInDays;
    let itemsOk = true;
    let selectedCurrencyValue: SelectItem | undefined;
    let selectedCustomerValue: SelectItem | undefined;
    let selectedOrganizationValue: SelectItem | undefined;
    let lines: SalesInvoiceLineSaveArgs[] = R.clone(salesInvoice?.lines || []).map((x) => ({
        ...x,
        productId: x.product.id,
        lineTaxIsStandard: true,
    }));
    const emptyItem = () =>
        ({
            lineOrder: lines.length === 0 ? 10 : Math.max(...lines.map((x) => x.lineOrder)) + 10,
            lineTaxIsStandard: true,
        } as SalesInvoiceLineSaveArgs);

    $: {
        selectedCurrencyValue = mapCurrencies($currenciesStore?.currencies).find(
            (x) => x.value === currencyIsoCode,
        );
        selectedCustomerValue = mapCustomers($customersStore?.customers).find(
            (x) => x.label === customerDisplayName,
        );
        selectedOrganizationValue = mapOrganizations($organizationsStore?.organizations).find(
            (x) => x.label === organizationDisplayName,
        );
    }

    const myForm = form(
        () => ({
            currencyIsoCode: {
                value: currencyIsoCode,
                validators: ['required'],
            },
            customerDisplayName: {
                value: customerDisplayName,
                validators: ['required'],
            },
            organizationDisplayName: {
                value: organizationDisplayName,
                validators: ['required'],
            },
            issuedOn: {
                value: issuedOn,
                validators: ['required'],
            },
            transactionDate: {
                value: transactionDate,
                validators: ['required'],
            },
            paymentTermInDays: {
                value: paymentTermInDays,
                validators: ['required'],
            },
            itemsOk: {
                value: itemsOk,
                validators: ['required'],
            },
        }),
        {
            initCheck: true,
            validateOnChange: false,
            stopAtFirstError: false,
            stopAtFirstFieldError: false,
        },
    );
    const handleSelectCurrency = (event: OnSelectParam) => {
        currencyIsoCode = '' + event.detail.value;
        myForm.validate();
    };
    const handleSelectCustomer = (event: OnSelectParam) => {
        customerDisplayName = '' + event.detail.value;
        myForm.validate();
    };
    const handleSelectOrganization = (event: OnSelectParam) => {
        organizationDisplayName = '' + event.detail.value;
        myForm.validate();
    };

    const columns: Column[] = [
        {
            name: 'Quantity',
            cellComponent: QuantityColumn,
        },
        {
            name: 'Line price',
            cellComponent: LinePriceColumn,
        },
        {
            name: 'Narration',
            cellComponent: NarrationColumn,
        },
        {
            name: 'Product',
            cellComponent: ProductColumn,
        },
    ];
    const rowActions: RowAction[] = [
        {
            name: 'Remove',
            onclick: (row: SalesInvoiceLineSaveArgs) => {
                console.log('*** row', row.lineOrder);
                lines = lines.filter((x) => x.lineOrder !== row.lineOrder);
                console.log('*** items', lines);
            },
        },
    ];

    const getLineOrder: (x: SalesInvoiceLineSaveArgs) => number = (x) => x.lineOrder;
</script>

<div class="mt-10 sm:mt-0">
    <div class="md:gap-6">
        <div class="mt-5 md:mt-0">
            <div class="shadow overflow-hidden sm:rounded-md">
                <div class="px-4 py-5 bg-white sm:p-6">
                    <div class="grid grid-cols-6 gap-6">
                        <div class="col-span-6 sm:col-span-4">
                            <label for="currencies" class="block text-sm font-medium text-gray-700"
                                >Currencies</label
                            >
                            {#if $myForm.fields.currencyIsoCode.errors.includes('required')}
                                <label
                                    for="currencies"
                                    class="block text-sm font-small text-red-700">Required</label
                                >
                            {/if}
                            <Select
                                inputAttributes={{ id: 'currencies' }}
                                items={mapCurrencies($currenciesStore?.currencies)}
                                selectedValue={selectedCurrencyValue}
                                on:select={handleSelectCurrency}
                            />
                        </div>
                    </div>

                    <div class="grid grid-cols-6 gap-6">
                        <div class="col-span-6 sm:col-span-4">
                            <label for="customers" class="block text-sm font-medium text-gray-700"
                                >Customers</label
                            >
                            {#if $myForm.fields.customerDisplayName.errors.includes('required')}
                                <label for="customers" class="block text-sm font-small text-red-700"
                                    >Required</label
                                >
                            {/if}
                            <Select
                                inputAttributes={{ id: 'customers' }}
                                items={mapCustomers($customersStore?.customers)}
                                selectedValue={selectedCustomerValue}
                                on:select={handleSelectCustomer}
                            />
                        </div>
                    </div>

                    <div class="grid grid-cols-6 gap-6">
                        <div class="col-span-6 sm:col-span-4">
                            <label
                                for="organizations"
                                class="block text-sm font-medium text-gray-700">Organizations</label
                            >
                            {#if $myForm.fields.organizationDisplayName.errors.includes('required')}
                                <label
                                    for="organizations"
                                    class="block text-sm font-small text-red-700">Required</label
                                >
                            {/if}
                            <Select
                                inputAttributes={{ id: 'organizations' }}
                                items={mapOrganizations($organizationsStore?.organizations)}
                                selectedValue={selectedOrganizationValue}
                                on:select={handleSelectOrganization}
                            />
                        </div>
                    </div>

                    <SimpleTextBox
                        form={myForm}
                        title="Issued On"
                        bind:value={issuedOn}
                        id="issuedOn"
                        type="date"
                    />

                    <SimpleTextBox
                        form={myForm}
                        title="Transaction Date"
                        bind:value={transactionDate}
                        id="transactionDate"
                        type="date"
                    />

                    <SimpleTextBox
                        form={myForm}
                        title="Payment Term in Days"
                        bind:value={paymentTermInDays}
                        id="paymentTermInDays"
                    />

                    <button
                        on:click|preventDefault={() => {
                            lines = [...lines, emptyItem()];
                        }}
                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                    >
                        Add row
                    </button>
                    <DataGrid
                        rows={lines}
                        {columns}
                        {rowActions}
                        getRowKey={getLineOrder}
                        border={true}
                        noScroll={true}
                    />

                    <div class="px-4 py-3 bg-white text-right sm:px-6">
                        <button
                            type="submit"
                            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            on:click|preventDefault={() => {
                                createSalesInvoice();
                            }}
                            disabled={false}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

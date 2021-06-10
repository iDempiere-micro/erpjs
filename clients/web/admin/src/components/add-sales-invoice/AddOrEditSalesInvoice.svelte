<script lang="ts">
    import SimpleTextBox from '../../molecules/form/SimpleTextBox.svelte';
    import { form } from '../../absorb/svelte-forms/src';
    import type {
        FactoringProvidersForInvoiceQuery,
        SalesInvoiceLineSaveArgs,
    } from '../../generated/graphql';
    import DataGrid from '../../molecules/datagrid/Datagrid.svelte';
    import QuantityColumn from './QuantityColumn.svelte';
    import LinePriceColumn from './LinePriceColumn.svelte';
    import NarrationColumn from './NarrationColumn.svelte';
    import ProductColumn from './ProductColumn.svelte';
    import type { Column, RowAction } from '../../molecules/datagrid/types';
    import * as R from 'ramda';
    import { push, urls } from '../../pages/pathAndSegment';
    import FactoringProviderSelect from '../factoringProviders/FactoringProviderSelect.svelte';
    import { _ } from 'svelte-i18n';
    import CustomerSelect from '../customers/CustomerSelect.svelte';
    import CurrencySelect from '../currencies/CurrencySelect.svelte';
    import OrganizationSelect from '../organizations/OrganizationSelect.svelte';
    import Button from '../../dsl/Button.svelte';
    import type { ReadableQuery } from '../../absorb/svelte-apollo';
    import type { FactoringProviderRow } from '../../lib/model/factoringProvider';
    import { factoringProviderService, salesInvoiceService } from '../../lib/core';
    import type { SalesInvoiceDetail } from '../../lib/model/salesInvoice';
    import type { Opt } from '../../lib/support/types';

    export let salesInvoice: SalesInvoiceDetail | undefined;
    let {
        id,
        currency,
        customer,
        organization,
        issuedOn,
        transactionDate,
        paymentTermInDays,
        factoringProvider,
    } = salesInvoice || {};
    let factoringProviderId = (factoringProvider || {}).id;

    if (salesInvoice && !salesInvoice.isDraft) {
        push(urls.salesInvoices.detail, salesInvoice.id);
    }

    const saveSalesInvoice = async () => {
        if (organizationId && customerId && currencyId && paymentTermInDays) {
            paymentTermInDays = +paymentTermInDays;
            const { data } = await salesInvoiceService.save({
                id,
                currencyId,
                customerId,
                issuedOn,
                lines: lines.map((line) => ({
                    lineOrder: line.lineOrder,
                    linePrice: line.linePrice,
                    lineTaxIsStandard: true,
                    narration: line.narration,
                    productId: line.productId,
                    quantity: line.quantity,
                })),
                organizationId,
                paymentTermInDays,
                transactionDate,
                factoringProviderId,
            });
            if (data && data.saveSalesInvoice)
                await push(urls.salesInvoices.detail, data.saveSalesInvoice.id);
        }
    };

    let currencyId = (currency || {}).id;
    let customerId = (customer || {}).id;
    let organizationId = (organization || {}).id;
    let itemsOk = true;
    let lines: SalesInvoiceLineSaveArgs[] = R.clone((salesInvoice || {}).lines || []).map((x) => ({
        ...x,
        productId: x.product.id,
        lineTaxIsStandard: true,
    }));
    const emptyItem = () =>
        ({
            lineOrder: lines.length === 0 ? 10 : Math.max(...lines.map((x) => x.lineOrder)) + 10,
            lineTaxIsStandard: true,
        } as SalesInvoiceLineSaveArgs);

    const myForm = form(
        () => ({
            currencyId: {
                value: currencyId,
                validators: ['required'],
            },
            customerId: {
                value: customerId,
                validators: ['required'],
            },
            organizationId: {
                value: organizationId,
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
            factoringProviderId: {
                value: factoringProviderId,
                validators: [],
            },
        }),
        {
            initCheck: true,
            validateOnChange: false,
            stopAtFirstError: false,
            stopAtFirstFieldError: false,
        },
    );
    const handleSelectCurrency = (id: Opt<number>) => {
        currencyId = id;
        myForm.validate();
    };
    const handleSelectCustomer = (id: Opt<number>) => {
        customerId = id;
        reGetFactoringProvidersResult();
        myForm.validate();
    };
    const handleSelectOrganization = (id: Opt<number>) => {
        organizationId = id;
        reGetFactoringProvidersResult();
        myForm.validate();
    };
    const handleSelectFactoringProvider = (id: Opt<number>) => {
        factoringProviderId = id;
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
                lines = lines.filter((x) => x.lineOrder !== row.lineOrder);
            },
        },
    ];

    let factoringProvidersResult: ReadableQuery<FactoringProvidersForInvoiceQuery>;

    const reGetFactoringProvidersResult = () => {
        if (!customerId || !organizationId) return;

        factoringProvidersResult = factoringProviderService.forInvoice(customerId, organizationId);
    };
    let factoringProviders: FactoringProviderRow[] | undefined;
    $: {
        if (
            $factoringProvidersResult &&
            !$factoringProvidersResult.loading &&
            $factoringProvidersResult.data
        )
            factoringProviders = ($factoringProvidersResult.data || {})
                .factoringProvidersForInvoice;
    }
    const getLineOrder: (x: SalesInvoiceLineSaveArgs) => number = (x) => x.lineOrder;
</script>

<form autocomplete="off">
    <div class="mt-10 sm:mt-0">
        <div class="md:gap-6">
            <div class="mt-5 md:mt-0">
                <div class="shadow overflow-hidden sm:rounded-md">
                    <div class="px-4 py-5 bg-white sm:p-6">
                        <div class="grid grid-cols-6 gap-6">
                            <div class="col-span-6 sm:col-span-4">
                                <CurrencySelect
                                    onSelect={handleSelectCurrency}
                                    id="currencyId"
                                    label={$_('page.salesInvoices.add.currency')}
                                    {currencyId}
                                    form={myForm}
                                />
                            </div>
                        </div>

                        <div class="grid grid-cols-6 gap-6">
                            <div class="col-span-6 sm:col-span-4">
                                <CustomerSelect
                                    onSelect={handleSelectCustomer}
                                    id="customerId"
                                    label={$_('page.salesInvoices.add.customer')}
                                    {customerId}
                                    form={myForm}
                                />
                            </div>
                        </div>

                        <div class="grid grid-cols-6 gap-6">
                            <div class="col-span-6 sm:col-span-4">
                                <OrganizationSelect
                                    onSelect={handleSelectOrganization}
                                    id="organizationId"
                                    label={$_('page.salesInvoices.add.organization')}
                                    {organizationId}
                                    form={myForm}
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
                            type="number"
                            title="Payment Term in Days"
                            bind:value={paymentTermInDays}
                            id="paymentTermInDays"
                        />
                        <div class="col-span-6 sm:col-span-4">
                            <FactoringProviderSelect
                                onSelect={handleSelectFactoringProvider}
                                id="factoringProviderId"
                                label={$_('page.factoringContracts.add.factoringProvider')}
                                {factoringProviderId}
                                form={myForm}
                                {factoringProviders}
                            />
                        </div>

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
                            <Button
                                on:click={() => {
                                    saveSalesInvoice();
                                }}
                                disabled={!$myForm.valid}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>

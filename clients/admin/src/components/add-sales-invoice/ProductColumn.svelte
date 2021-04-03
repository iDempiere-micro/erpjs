<script lang="ts">
    import type {
        SalesInvoiceLineDetailPartsFragment,
        SalesInvoiceLineSaveArgs,
    } from '../../generated/graphql';
    import { productsStore, mapProducts } from '../../lib/product';
    import Select from 'svelte-select';

    export let row: SalesInvoiceLineSaveArgs;
    let selectedValue;
    const handleSelectProduct = (event) => {
        console.log('*** row', row);
        row.productId = event.detail.value;
    };
    $: {
        const products = $productsStore?.products;
        console.log('*** products', products, row);

        selectedValue = mapProducts(products).find((x) => x.value === row.productId);

        console.log('*** selectedValue', selectedValue);
    }
    /* {... selectedValue ? ({selectedValue: selectedValue}) : {}} */
</script>

<div class="flex items-center z-40">
    <Select
        style="width: 100%"
        id="products"
        items={mapProducts($productsStore?.products)}
        on:select={handleSelectProduct}
        {selectedValue}
    />
</div>

<style>
    .listContainer {
        z-index: 50;
    }
</style>

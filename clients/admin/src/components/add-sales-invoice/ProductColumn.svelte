<script lang="ts">
    import type { SalesInvoiceLineSaveArgs } from '../../generated/graphql';
    import { mapProducts, productsStore } from '../../lib/core/product';
    import Select from 'svelte-select';
    import type { OnSelectParam, SelectItem } from '../../lib/support/select';

    export let row: SalesInvoiceLineSaveArgs;
    let selectedValue: SelectItem | undefined;
    const handleSelectProduct = (event: OnSelectParam) => {
        row.productId = +event.detail.value;
    };
    $: {
        const products = $productsStore?.products;
        selectedValue = mapProducts(products).find((x) => x.value === row.productId);
    }
</script>

<div class="flex items-center z-40">
    <Select
        inputStyles="width: 100%;"
        items={mapProducts($productsStore?.products)}
        on:select={handleSelectProduct}
        {selectedValue}
    />
</div>

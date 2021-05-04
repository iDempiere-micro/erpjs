<script lang="ts">
    import type { SalesInvoiceLineSaveArgs } from '../../generated/graphql';
    import ProductSelectSmall from '../products/ProductSelectSmall.svelte';

    export let row: SalesInvoiceLineSaveArgs;
    const handleSelectProduct = (id: number) => {
        row.productId = id;
    };
</script>

<div class="flex items-center z-40">
    <ProductSelectSmall
        inputStyles="width: 100%;"
        onSelect={handleSelectProduct}
        productId={row.productId}
    />
</div>

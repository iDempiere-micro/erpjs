<script lang="ts">
    import type { SalesInvoiceLineSaveArgs } from '../../generated/graphql';
    import ProductSelectSmall from '../products/ProductSelectSmall.svelte';
    import type { Opt } from '../../lib/support/types';

    export let row: SalesInvoiceLineSaveArgs;
    const handleSelectProduct = (id: Opt<number>) => {
        if (id) {
            row.productId = id;
        }
    };
</script>

<div class="flex items-center z-40">
    <ProductSelectSmall
        inputClasses="w-full"
        onSelect={handleSelectProduct}
        productId={row.productId}
    />
</div>

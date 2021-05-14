<script lang="ts">
    import Select from 'svelte-select';
    import { productService } from '../../lib/core';
    import type { OnSelectParam, SelectItem } from '../../lib/support/select';
    import { mapDisplayableToSelectItem } from '../../lib/support/util';

    productService.loadList();
    let selectedProduct: SelectItem | undefined;
    export let onSelect: (productId: number) => void = (productId) => {};
    export let productId: number | undefined;
    export let inputStyles: string | undefined = undefined;
    const store = productService.stores.list;

    const handleSelectProduct = (event: OnSelectParam) => {
        productId = +event.detail.value;
        onSelect(productId);
    };

    $: {
        selectedProduct = undefined;
        if (productId && $store.loaded) {
            const found = $store.data.find((x) => x.id === productId);
            if (found) {
                selectedProduct = mapDisplayableToSelectItem([found])[0];
            }
        }
    }
</script>

<Select
    inputAttributes={{ autocomplete: 'disabled' }}
    {inputStyles}
    items={mapDisplayableToSelectItem($store.data)}
    selectedValue={selectedProduct}
    on:select={handleSelectProduct}
/>

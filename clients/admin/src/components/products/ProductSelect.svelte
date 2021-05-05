<script lang="ts">
    import { _ } from 'svelte-i18n';
    import Select from 'svelte-select';
    import { productService } from '../../lib/core';
    import type { OnSelectParam, SelectItem } from '../../lib/support/select';
    import { mapDisplayableToSelectItem } from '../../lib/support/util';

    productService.loadList();
    let selectedProduct: SelectItem | undefined;
    export let onSelect: (productId: number) => void = (productId) => {};
    export let id: string;
    export let form: any;
    export let label: string;
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
            const found = $store.data.find((x) => x?.id === productId);
            if (found) {
                selectedProduct = mapDisplayableToSelectItem([found])[0];
            }
        }
    }
</script>

<label for={id} class="block text-sm font-medium text-gray-700">{label}</label>
<Select
    inputAttributes={{ id, 'data-testid': id, autocomplete: 'disabled' }}
    {inputStyles}
    items={mapDisplayableToSelectItem($store.data)}
    selectedValue={selectedProduct}
    on:select={handleSelectProduct}
/>
{#if form && id && form.fields[id].errors.includes('required')}
    <label for={id} class="block text-sm font-small text-red-700">{$_('validator.required')}</label>
{/if}

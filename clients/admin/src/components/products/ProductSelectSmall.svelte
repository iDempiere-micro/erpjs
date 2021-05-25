<script lang="ts">
    import { productService } from '../../lib/core';
    import { mapDisplayableToListItem } from '../../lib/support/util';
    import Select from '../../dsl/Select.svelte';
    import type { ErrorType, OnSelectedIdType } from '../../dsl/types';
    import type { Opt } from '../../lib/support/types';
    import { noop } from '../../dsl/classes';

    productService.loadList();
    export let onSelect: (productId: Opt<number>) => void = () => {};
    export let productId: Opt<number>;
    const store = productService.stores.list;
    let error: ErrorType = false;
    export let inputClasses = noop;

    const onSelected = (id: OnSelectedIdType) => {
        if (id) {
            onSelect(+id);
        } else {
            onSelect(undefined);
        }
    };
</script>

<Select
    id={Date.now().toString()}
    bind:value={productId}
    outlined
    autocomplete
    {error}
    items={mapDisplayableToListItem($store.data)}
    {onSelected}
/>

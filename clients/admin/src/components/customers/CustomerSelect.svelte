<script lang="ts">
    import { customerService } from '../../lib/core';
    import { mapDisplayableToListItem } from '../../lib/support/util';
    import Select from '../../dsl/Select.svelte';
    import type { Form } from '../../absorb/svelte-forms/src/types';
    import type { ErrorType, OnSelectedIdType } from '../../dsl/types';
    import type { Opt } from '../../lib/support/types';

    customerService.loadList();
    export let onSelect: (customerId: Opt<number>) => void = () => {};
    export let id: string;
    export let form: Form;
    export let label: string;
    export let customerId: Opt<number>;
    const store = customerService.stores.list;
    let error: ErrorType = false;

    const onSelected = (id: OnSelectedIdType) => {
        if (id) {
            onSelect(+id);
        } else {
            onSelect(undefined);
        }
    };
</script>

<Select
    bind:value={customerId}
    outlined
    autocomplete
    {error}
    {label}
    items={mapDisplayableToListItem($store.data)}
    {form}
    {onSelected}
    {id}
/>

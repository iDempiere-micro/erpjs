<script lang="ts">
    import { customerGroupService } from '../../lib/core';
    import { mapDisplayableToListItem } from '../../lib/support/util';
    import Select from '../../dsl/Select.svelte';
    import type { Form } from '../../absorb/svelte-forms/src/types';
    import type { ErrorType, OnSelectedIdType } from '../../dsl/types';
    import type { Opt } from '../../lib/support/types';

    customerGroupService.loadList();
    export let onSelect: (customerGroupId: Opt<number>) => void = () => {};
    export let id: string;
    export let form: Form;
    export let label: string;
    export let customerGroupId: Opt<number>;
    const store = customerGroupService.stores.list;
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
    bind:value={customerGroupId}
    outlined
    autocomplete
    {error}
    {label}
    items={mapDisplayableToListItem($store.data)}
    {form}
    {onSelected}
    {id}
/>

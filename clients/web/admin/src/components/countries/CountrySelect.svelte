<script lang="ts">
    import { countryService } from '../../lib/core';
    import { mapDisplayableToListItem } from '../../lib/support/util';
    import Select from '../../dsl/Select.svelte';
    import type { Form } from '../../absorb/svelte-forms/src/types';
    import type { ErrorType, OnSelectedIdType } from '../../dsl/types';
    import type { Opt } from '../../lib/support/types';

    countryService.loadList();
    export let onSelect: (countryId: Opt<number>) => void = () => {};
    export let id: string;
    export let form: Form;
    export let label: string;
    export let countryId: Opt<number>;
    const store = countryService.stores.list;
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
    bind:value={countryId}
    outlined
    autocomplete
    {error}
    {label}
    items={mapDisplayableToListItem($store.data)}
    {form}
    {onSelected}
    {id}
/>

<script lang="ts">
    import { countryService } from '../../lib/core';
    import { mapDisplayableToSelectItem } from '../../lib/support/util';
    import Select from '../../dsl/Select.svelte';
    import type { Form } from '../../absorb/svelte-forms/src/types';
    import type { IdType } from '../../dsl/types';

    countryService.loadList();
    export let onSelect: (countryId: number) => void = (countryId) => {};
    export let id: string;
    export let form: Form;
    export let label: string;
    export let countryId: number | undefined;
    const store = countryService.stores.list;
    let error: boolean | string = false;

    const onSelected = (id: IdType) => {
        onSelect(+id);
    }
</script>

<Select
    bind:value={countryId}
    outlined
    autocomplete
    {error}
    {label}
    items={mapDisplayableToSelectItem($store.data)}
    {form}
    {onSelected}
    {id}
/>

<script lang="ts">
    import { accountingSchemeService } from '../../lib/core';
    import Select from '../../dsl/Select.svelte';
    import type { Form } from '../../absorb/svelte-forms/src/types';
    import type { ErrorType, OnSelectedIdType } from '../../dsl/types';
    import type {Opt} from "@eolerp/common";
    import { mapDisplayableToListItem } from '../../lib/support/util';

    accountingSchemeService.loadList();
    export let onSelect: (accountingSchemeId: Opt<number>) => void = () => {};
    export let id: string;
    export let form: Form;
    export let label: string;
    export let accountingSchemeId: Opt<number>;
    const store = accountingSchemeService.stores.list;
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
    bind:value={accountingSchemeId}
    outlined
    autocomplete
    {error}
    {label}
    items={mapDisplayableToListItem($store.data)}
    {form}
    {onSelected}
    {id}
/>

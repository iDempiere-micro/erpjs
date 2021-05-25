<script lang="ts">
    import { factoringProviderService } from '../../lib/core';
    import { mapDisplayableToListItem } from '../../lib/support/util';
    import Select from '../../dsl/Select.svelte';
    import type { Form } from '../../absorb/svelte-forms/src/types';
    import type { ErrorType, OnSelectedIdType } from '../../dsl/types';
    import type { Opt } from '../../lib/support/types';
    import type { FactoringProviderRow } from '../../lib/model/factoringProvider';

    factoringProviderService.loadList();
    export let onSelect: (factoringProviderId: Opt<number>) => void = () => {};
    export let id: string;
    export let form: Form;
    export let label: string;
    export let factoringProviderId: Opt<number>;
    const store = factoringProviderService.stores.list;
    let error: ErrorType = false;

    export let factoringProviders: FactoringProviderRow[] = $store.data;

    const onSelected = (id: OnSelectedIdType) => {
        if (id) {
            onSelect(+id);
        } else {
            onSelect(undefined);
        }
    };
</script>

<Select
    bind:value={factoringProviderId}
    outlined
    autocomplete
    {error}
    {label}
    items={mapDisplayableToListItem($store.data)}
    {form}
    {onSelected}
    {id}
/>

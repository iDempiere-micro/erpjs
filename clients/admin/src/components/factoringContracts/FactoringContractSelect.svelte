<script lang="ts">
    import { factoringContractService } from '../../lib/core';
    import { mapDisplayableToListItem } from '../../lib/support/util';
    import Select from '../../dsl/Select.svelte';
    import type { Form } from '../../absorb/svelte-forms/src/types';
    import type { ErrorType, OnSelectedIdType } from '../../dsl/types';
    import type { Opt } from '../../lib/support/types';

    factoringContractService.loadList();
    export let onSelect: (factoringContractId: Opt<number>) => void = () => {};
    export let id: string;
    export let form: Form;
    export let label: string;
    export let factoringContractId: Opt<number>;
    const store = factoringContractService.stores.list;
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
    bind:value={factoringContractId}
    outlined
    autocomplete
    {error}
    {label}
    items={factoringContractService.mapFactoringContracts($store.data)}
    {form}
    {onSelected}
    {id}
/>

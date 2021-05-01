<script lang="ts">
    import { _ } from 'svelte-i18n';
    import Select from 'svelte-select';
    import {
        ensureFactoringContractsStore,
        factoringContractsStore,
        mapFactoringContracts,
    } from '../../lib/factoringContract';
    import type { OnSelectParam, SelectItem } from '../../lib/select';

    ensureFactoringContractsStore();
    let selectedFactoringContract: SelectItem | undefined;
    export let onSelect: (factoringContractId: number) => void = (factoringContractId) => {};
    export let id: string;
    export let form: any;
    export let label: string;
    export let factoringContractId: number | undefined;

    const handleSelectFactoringContract = (event: OnSelectParam) => {
        factoringContractId = +event.detail.value;
        onSelect(factoringContractId);
    };

    $: {
        selectedFactoringContract = undefined;
        if (factoringContractId) {
            const found = $factoringContractsStore.factoringContracts.find(
                (x) => x?.id === factoringContractId,
            );
            if (found) {
                selectedFactoringContract = mapFactoringContracts([found])[0];
            }
        }
    }
</script>

<label for={id} class="block text-sm font-medium text-gray-700">{label}</label>
<Select
    inputAttributes={{ id, 'data-testid': id, autocomplete: 'disabled' }}
    items={mapFactoringContracts($factoringContractsStore.factoringContracts)}
    selectedValue={selectedFactoringContract}
    on:select={handleSelectFactoringContract}
/>
{#if form && form.fields[id].errors.includes('required')}
    <label for={id} class="block text-sm font-small text-red-700">{$_('validator.required')}</label>
{/if}

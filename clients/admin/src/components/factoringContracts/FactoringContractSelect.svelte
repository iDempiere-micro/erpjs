<script lang="ts">
    import { _ } from 'svelte-i18n';
    import Select from 'svelte-select';
    import { factoringContractService } from '../../lib/core';
    import type { OnSelectParam, SelectItem } from '../../lib/support/select';

    factoringContractService.loadList();
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

    const factoringContractsStore = factoringContractService.stores.list;

    $: {
        selectedFactoringContract = undefined;
        if (factoringContractId && $factoringContractsStore.loaded) {
            const found = $factoringContractsStore.data.find((x) => x.id === factoringContractId);
            if (found) {
                selectedFactoringContract = factoringContractService.mapFactoringContracts([
                    found,
                ])[0];
            }
        }
    }
</script>

<label for={id} class="block text-sm font-medium text-gray-700">{label}</label>
<Select
    inputAttributes={{ id, 'data-testid': id, autocomplete: 'disabled' }}
    items={factoringContractService.mapFactoringContracts($factoringContractsStore.data)}
    selectedValue={selectedFactoringContract}
    on:select={handleSelectFactoringContract}
/>
{#if form && form.fields[id].errors.includes('required')}
    <label for={id} class="block text-sm font-small text-red-700">{$_('validator.required')}</label>
{/if}

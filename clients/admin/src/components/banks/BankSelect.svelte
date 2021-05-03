<script lang="ts">
    import { _ } from 'svelte-i18n';
    import Select from 'svelte-select';
    import { bankService } from '../../lib/core';
    import type { OnSelectParam, SelectItem } from '../../lib/support/select';
    import { mapDisplayableToSelectItem } from '../../lib/support/util';

    bankService.loadList();
    let selectedBank: SelectItem | undefined;
    export let onSelect: (bankId: number) => void = (bankId) => {};
    export let id: string;
    export let form: any;
    export let label: string;
    export let bankId: number | undefined;
    const store = bankService.stores.list;

    const handleSelectBank = (event: OnSelectParam) => {
        bankId = +event.detail.value;
        onSelect(bankId);
    };

    $: {
        selectedBank = undefined;
        if (bankId && $store.loaded) {
            const found = $store.data.find((x) => x?.id === bankId);
            if (found) {
                selectedBank = mapDisplayableToSelectItem([found])[0];
            }
        }
    }
</script>

<label for={id} class="block text-sm font-medium text-gray-700">{label}</label>
<Select
    inputAttributes={{ id, 'data-testid': id, autocomplete: 'disabled' }}
    items={mapDisplayableToSelectItem($store.data)}
    selectedValue={selectedBank}
    on:select={handleSelectBank}
/>
{#if form && form.fields[id].errors.includes('required')}
    <label for={id} class="block text-sm font-small text-red-700">{$_('validator.required')}</label>
{/if}

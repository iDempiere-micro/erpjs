<script lang="ts">
    import { _ } from 'svelte-i18n';
    import Select from 'svelte-select';
    import { accountingSchemeService } from '../../lib/core';
    import type { OnSelectParam, SelectItem } from '../../lib/support/select';
    import { mapDisplayableToSelectItem } from '../../lib/support/util';

    accountingSchemeService.loadList();
    let selectedAccountingScheme: SelectItem | undefined;
    export let onSelect: (accountingSchemeId: number) => void = (accountingSchemeId) => {};
    export let id: string;
    export let form: any;
    export let label: string;
    export let accountingSchemeId: number | undefined;
    const store = accountingSchemeService.stores.list;

    const handleSelectAccountingScheme = (event: OnSelectParam) => {
        accountingSchemeId = +event.detail.value;
        onSelect(accountingSchemeId);
    };

    $: {
        selectedAccountingScheme = undefined;
        if (accountingSchemeId) {
            const found = $store.data.find((x) => x.id === accountingSchemeId);
            if (found) {
                selectedAccountingScheme = mapDisplayableToSelectItem([found])[0];
            }
        }
    }
</script>

<label for={id} class="block text-sm font-medium text-gray-700">{label}</label>
<Select
    inputAttributes={{ id, 'data-testid': id, autocomplete: 'disabled' }}
    items={mapDisplayableToSelectItem($store.data)}
    selectedValue={selectedAccountingScheme}
    on:select={handleSelectAccountingScheme}
/>
{#if form && form.fields[id].errors.includes('required')}
    <label for={id} class="block text-sm font-small text-red-700">{$_('validator.required')}</label>
{/if}

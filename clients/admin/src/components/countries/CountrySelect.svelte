<script lang="ts">
    import { _ } from 'svelte-i18n';
    import Select from 'svelte-select';
    import { countryService } from '../../lib/core';
    import type { OnSelectParam, SelectItem } from '../../lib/support/select';
    import { mapDisplayableToSelectItem } from '../../lib/support/util';

    countryService.loadList();
    let selectedCountry: SelectItem | undefined;
    export let onSelect: (countryId: number) => void = (countryId) => {};
    export let id: string;
    export let form: any;
    export let label: string;
    export let countryId: number | undefined;
    const store = countryService.stores.list;

    console.log('*** ', form, id);

    const handleSelectCountry = (event: OnSelectParam) => {
        countryId = +event.detail.value;
        onSelect(countryId);
    };

    $: {
        selectedCountry = undefined;
        if (countryId && $store.data) {
            const found = $store.data.find((x) => x?.id === countryId);
            if (found) {
                selectedCountry = mapDisplayableToSelectItem([found])[0];
            }
        }
    }
</script>

<label for={id} class="block text-sm font-medium text-gray-700">{label}</label>
<Select
    inputAttributes={{ id, 'data-testid': id, autocomplete: 'disabled' }}
    items={mapDisplayableToSelectItem($store.data)}
    selectedValue={selectedCountry}
    on:select={handleSelectCountry}
/>
{#if form && form.fields[id].errors.includes('required')}
    <label for={id} class="block text-sm font-small text-red-700">{$_('validator.required')}</label>
{/if}

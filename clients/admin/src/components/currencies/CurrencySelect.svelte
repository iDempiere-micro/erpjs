<script lang="ts">
    import { _ } from 'svelte-i18n';
    import Select from 'svelte-select';
    import { currenciesStore, ensureCurrenciesStore, mapCurrencies } from '../../lib/currency';
    import type { OnSelectParam, SelectItem } from '../../lib/select';

    ensureCurrenciesStore();
    let selectedCurrency: SelectItem | undefined;
    export let onSelect: (currencyId: number) => void = (currencyId) => {};
    export let id: string;
    export let form: any;
    export let label: string;
    export let currencyId: number | undefined;

    const handleSelectCurrency = (event: OnSelectParam) => {
        currencyId = +event.detail.value;
        onSelect(currencyId);
    };

    $: {
        selectedCurrency = undefined;
        if (currencyId) {
            const found = $currenciesStore.currencies.find((x) => x?.id === currencyId);
            if (found) {
                selectedCurrency = mapCurrencies([found])[0];
            }
        }
    }
</script>

<label for={id} class="block text-sm font-medium text-gray-700">{label}</label>
<Select
    inputAttributes={{ id, 'data-testid': id, autocomplete: 'disabled' }}
    items={mapCurrencies($currenciesStore.currencies)}
    selectedValue={selectedCurrency}
    on:select={handleSelectCurrency}
/>
{#if form && form.fields[id].errors.includes('required')}
    <label for={id} class="block text-sm font-small text-red-700">{$_('validator.required')}</label>
{/if}

<script lang="ts">
    import { _ } from 'svelte-i18n';
    import Select from 'svelte-select';
    import { factoringProviderService } from '../../lib/core';
    import type { OnSelectParam, SelectItem } from '../../lib/support/select';
    import type { FactoringProviderRow } from '../../lib/model/factoringProvider';
    import { mapDisplayableToSelectItem } from '../../lib/support/util';

    factoringProviderService.loadList();
    let selectedFactoringProvider: SelectItem | undefined;
    export let onSelect: (factoringProviderId: number) => void = (factoringProviderId) => {};
    export let id: string;
    export let form: any;
    export let label: string;
    export let factoringProviderId: number | undefined;

    const store = factoringProviderService.stores.list;

    export let factoringProviders: FactoringProviderRow[] = $store.data;

    const handleSelectFactoringProvider = (event: OnSelectParam) => {
        factoringProviderId = +event.detail.value;
        onSelect(factoringProviderId);
    };

    $: {
        selectedFactoringProvider = undefined;
        if (factoringProviderId) {
            const found = $store.data.find((x) => x.id === factoringProviderId);
            if (found) {
                selectedFactoringProvider = mapDisplayableToSelectItem([found])[0];
            }
        }
    }
</script>

<label for={id} class="block text-sm font-medium text-gray-700">{label}</label>
<Select
    inputAttributes={{ id, 'data-testid': id, autocomplete: 'disabled' }}
    items={mapDisplayableToSelectItem(factoringProviders)}
    selectedValue={selectedFactoringProvider}
    on:select={handleSelectFactoringProvider}
/>
{#if form && form.fields[id].errors.includes('required')}
    <label for={id} class="block text-sm font-small text-red-700">{$_('validator.required')}</label>
{/if}

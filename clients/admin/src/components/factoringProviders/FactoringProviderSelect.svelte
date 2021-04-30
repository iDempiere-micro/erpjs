<script lang="ts">
    import { _ } from 'svelte-i18n';
    import Select from 'svelte-select';
    import {
        factoringProvidersStore,
        ensureFactoringProvidersStore,
        mapFactoringProviders,
    } from '../../lib/factoringProvider';
    import type { OnSelectParam, SelectItem } from '../../lib/select';
    import type { FactoringProviderListPartsFragment } from '../../generated/graphql';

    ensureFactoringProvidersStore();
    let selectedFactoringProvider: SelectItem | undefined;
    export let onSelect: (factoringProviderId: number) => void = (factoringProviderId) => {};
    export let id: string;
    export let form: any;
    export let label: string;
    export let factoringProviderId: number | undefined;
    export let factoringProviders:
        | FactoringProviderListPartsFragment[]
        | undefined = factoringProvidersStore.get().factoringProviders;

    const handleSelectFactoringProvider = (event: OnSelectParam) => {
        factoringProviderId = +event.detail.value;
        onSelect(factoringProviderId);
    };

    $: {
        selectedFactoringProvider = undefined;
        if (factoringProviderId) {
            const found = $factoringProvidersStore.factoringProviders.find(
                (x) => x?.id === factoringProviderId,
            );
            if (found) {
                selectedFactoringProvider = mapFactoringProviders([found])[0];
            }
        }
    }
</script>

<label for={id} class="block text-sm font-medium text-gray-700">{label}</label>
<Select
    inputAttributes={{ id, 'data-testid': id, autocomplete: 'disabled' }}
    items={mapFactoringProviders(factoringProviders)}
    selectedValue={selectedFactoringProvider}
    on:select={handleSelectFactoringProvider}
/>
{#if form && form.fields[id].errors.includes('required')}
    <label for={id} class="block text-sm font-small text-red-700">{$_('validator.required')}</label>
{/if}

<script lang="ts">
    import { _ } from 'svelte-i18n';
    import Select from 'svelte-select';
    import { organizationService } from '../../lib/core';
    import type { OnSelectParam, SelectItem } from '../../lib/support/select';
    import { mapDisplayableToSelectItem } from '../../lib/support/util';

    organizationService.loadList();
    let selectedOrganization: SelectItem | undefined;
    export let onSelect: (organizationId: number) => void = (organizationId) => {};
    export let id: string;
    export let form: any;
    export let label: string;
    export let organizationId: number | undefined;

    const handleSelectOrganization = (event: OnSelectParam) => {
        organizationId = +event.detail.value;
        onSelect(organizationId);
    };

    const organizationsStore = organizationService.stores.list;

    $: {
        selectedOrganization = undefined;
        if (organizationId) {
            const found = $organizationsStore.data.find((x) => x.id === organizationId);
            if (found) {
                selectedOrganization = mapDisplayableToSelectItem([found])[0];
            }
        }
    }
</script>

<label for={id} class="block text-sm font-medium text-gray-700">{label}</label>
<Select
    inputAttributes={{ id, 'data-testid': id, autocomplete: 'disabled' }}
    items={mapDisplayableToSelectItem($organizationsStore.data)}
    selectedValue={selectedOrganization}
    on:select={handleSelectOrganization}
/>
{#if form && form.fields[id].errors.includes('required')}
    <label for={id} class="block text-sm font-small text-red-700">{$_('validator.required')}</label>
{/if}

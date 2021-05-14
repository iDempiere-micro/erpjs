<script lang="ts">
    import { _ } from 'svelte-i18n';
    import Select from 'svelte-select';
    import type { OnSelectParam, SelectItem } from '../../lib/support/select';
    import { customerService } from '../../lib/core';
    import { mapDisplayableToSelectItem } from '../../lib/support/util';

    customerService.loadList();
    let selectedCustomer: SelectItem | undefined;
    export let onSelect: (customerId: number) => void = (customerId) => {};
    export let id: string;
    export let form: any;
    export let label: string;
    export let customerId: number | undefined;

    const handleSelectCustomer = (event: OnSelectParam) => {
        customerId = +event.detail.value;
        onSelect(customerId);
    };

    const customersStore = customerService.stores.list;

    $: {
        selectedCustomer = undefined;
        if (customerId && $customersStore.loaded) {
            const found = $customersStore.data.find((x) => x.id === customerId);
            if (found) {
                selectedCustomer = mapDisplayableToSelectItem([found])[0];
            }
        }
    }
</script>

<label for={id} class="block text-sm font-medium text-gray-700">{label}</label>
<Select
    inputAttributes={{ id, 'data-testid': id, autocomplete: 'disabled' }}
    items={mapDisplayableToSelectItem($customersStore.data)}
    selectedValue={selectedCustomer}
    on:select={handleSelectCustomer}
/>
{#if form && form.fields[id].errors.includes('required')}
    <label for={id} class="block text-sm font-small text-red-700">{$_('validator.required')}</label>
{/if}

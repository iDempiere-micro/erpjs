<script lang="ts">
    import { _ } from 'svelte-i18n';
    import Select from 'svelte-select';
    import { customerGroupService } from '../../lib/core';
    import type { OnSelectParam, SelectItem } from '../../lib/support/select';
    import { mapDisplayableToSelectItem } from '../../lib/support/util';

    customerGroupService.loadList();
    let selectedCustomerGroup: SelectItem | undefined;
    export let onSelect: (customerGroupId: number) => void = (customerGroupId) => {};
    export let id: string;
    export let form: any;
    export let label: string;
    export let customerGroupId: number | undefined;

    const handleSelectCustomerGroup = (event: OnSelectParam) => {
        customerGroupId = +event.detail.value;
        onSelect(customerGroupId);
    };

    const store = customerGroupService.stores.list;

    $: {
        selectedCustomerGroup = undefined;
        if (customerGroupId && $store.loaded) {
            const found = $store.data.find((x) => x?.id === customerGroupId);
            if (found) {
                selectedCustomerGroup = mapDisplayableToSelectItem([found])[0];
            }
        }
    }
</script>

<label for={id} class="block text-sm font-medium text-gray-700">{label}</label>
<Select
    inputAttributes={{ id, 'data-testid': id, autocomplete: 'disabled' }}
    items={mapDisplayableToSelectItem($store.data)}
    selectedValue={selectedCustomerGroup}
    on:select={handleSelectCustomerGroup}
/>
{#if form && form.fields[id] && form.fields[id].errors.includes('required')}
    <label for={id} class="block text-sm font-small text-red-700">{$_('validator.required')}</label>
{/if}

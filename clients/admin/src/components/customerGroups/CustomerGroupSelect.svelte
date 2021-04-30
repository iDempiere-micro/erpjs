<script lang="ts">
    import { _ } from 'svelte-i18n';
    import Select from 'svelte-select';
    import {
        customerGroupsStore,
        ensureCustomerGroupsStore,
        mapCustomerGroups,
    } from '../../lib/customerGroup';
    import type { OnSelectParam, SelectItem } from '../../lib/select';

    ensureCustomerGroupsStore();
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

    $: {
        selectedCustomerGroup = undefined;
        if (customerGroupId) {
            const found = $customerGroupsStore.customerGroups.find(
                (x) => x?.id === customerGroupId,
            );
            if (found) {
                selectedCustomerGroup = mapCustomerGroups([found])[0];
            }
        }
    }
</script>

<label for={id} class="block text-sm font-medium text-gray-700">{label}</label>
<Select
    inputAttributes={{ id, 'data-testid': id, autocomplete: 'disabled' }}
    items={mapCustomerGroups($customerGroupsStore.customerGroups)}
    selectedValue={selectedCustomerGroup}
    on:select={handleSelectCustomerGroup}
/>
{#if form && form.fields[id] && form.fields[id].errors.includes('required')}
    <label for={id} class="block text-sm font-small text-red-700">{$_('validator.required')}</label>
{/if}

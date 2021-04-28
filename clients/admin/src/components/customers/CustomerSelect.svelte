<script lang="ts">
    import { _ } from 'svelte-i18n';
    import Select from 'svelte-select';
    import { customersStore, ensureCustomersStore, mapCustomers } from '../../lib/customer';
    import type { OnSelectParam, SelectItem } from '../../lib/select';

    ensureCustomersStore();
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

    $: {
        selectedCustomer = undefined;
        if (customerId) {
            const found = $customersStore.customers.find((x) => x?.id === customerId);
            if (found) {
                selectedCustomer = mapCustomers([found])[0];
            }
        }
    }
</script>

<label for={id} class="block text-sm font-medium text-gray-700">{label}</label>
<Select
    inputAttributes={{ id }}
    items={mapCustomers($customersStore.customers)}
    selectedValue={selectedCustomer}
    on:select={handleSelectCustomer}
/>
{#if form && form.fields[id].errors.includes('required')}
    <label for={id} class="block text-sm font-small text-red-700">{$_('validator.required')}</label>
{/if}

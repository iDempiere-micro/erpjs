<script lang="ts">
    import type {
        AddressListPartsFragment,
        CustomerListPartsFragment,
    } from '../../generated/graphql';
    import type { Column } from '../../molecules/datagrid/types';

    export let column: Column;
    export let row: CustomerListPartsFragment;

    const addressOneLiner = (address: AddressListPartsFragment) =>
        address
            ? `${address.line1}, ${address.country.isoCode}-${address.zipCode} ${address.city}`
            : '';
</script>

<div class="text-sm text-gray-900">{addressOneLiner(row.address)}</div>
<div class="text-sm text-gray-500">{addressOneLiner(row.legalAddress)}</div>

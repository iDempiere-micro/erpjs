<script lang="ts">
    import type { Address, CustomerDetailPartsFragment } from '../../generated/graphql';
    import type { Column } from '../../molecules/datagrid/types';

    export let column: Column;
    export let row: CustomerDetailPartsFragment;

    const addressOneLiner = (address: Address) =>
        `${address.line1}, ${address.country.isoCode}-${address.zipCode} ${address.city}`;
</script>

<div class="text-sm text-gray-900">{addressOneLiner(row.legalAddress)}</div>
<div class="text-sm text-gray-500">Optimization</div>

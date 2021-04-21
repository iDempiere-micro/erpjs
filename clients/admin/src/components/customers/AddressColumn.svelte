<script lang="ts">
    import type { CustomerListPartsFragment } from '../../generated/graphql';
    import { addressOneLiner } from '../../lib/address';

    export let row: CustomerListPartsFragment;
</script>

<div class="text-sm text-gray-900">{addressOneLiner(row.address)}</div>
<div class="text-sm text-gray-500">{addressOneLiner(row.legalAddress)}</div>

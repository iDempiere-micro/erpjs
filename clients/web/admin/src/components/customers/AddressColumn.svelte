<script lang="ts">
    import { addressOneLiner } from '../../lib/core';
    import type { CustomerRow } from '../../lib/model/customer';

    export let row: CustomerRow;
</script>

<div class="text-sm text-gray-900">{addressOneLiner(row.address)}</div>
<div class="text-sm text-gray-500">{addressOneLiner(row.legalAddress)}</div>

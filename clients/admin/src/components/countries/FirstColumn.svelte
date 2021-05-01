<script lang="ts">
    import type { CountryListPartsFragment } from '../../generated/graphql';

    export let row: CountryListPartsFragment;
</script>

<div class="flex items-center">
    <div class="ml-4">
        <div class="text-sm font-medium text-gray-900">
            {row.displayName}
        </div>
        <div class="text-sm text-gray-500">
            {row.isoCode}
        </div>
    </div>
</div>

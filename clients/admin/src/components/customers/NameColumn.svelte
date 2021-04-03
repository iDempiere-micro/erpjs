<script lang="ts">
    import type { CustomerDetailPartsFragment } from '../../generated/graphql';
    export let row: CustomerDetailPartsFragment;
</script>

<div class="flex items-center">
    <div class="flex-shrink-0 h-10 w-10">
        <img
            class="h-10 w-10 rounded-full"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60"
            alt=""
        />
    </div>
    <div class="ml-4">
        <div class="text-sm font-medium text-gray-900">
            {row.displayName}
        </div>
        <div class="text-sm text-gray-500">
            {row.legalName}
        </div>
    </div>
</div>

<script lang="ts">
    export let row: any;
</script>

<div class="flex items-center">
    <div class="ml-4">
        <div class="text-sm font-medium text-gray-900">
            {row.firstLine}
        </div>
        <div class="text-sm text-gray-500">
            {row.secondLine}
        </div>
    </div>
</div>

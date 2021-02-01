<script lang="ts">
    import type { Column, RowAction } from './types';
    import { Link } from 'svelte-routing';

    export let columns: Column[] = [];
    export let rowActions: RowAction[] = [];
    export let rows: any[] | undefined = [];
</script>

<table class="min-w-full divide-y divide-gray-200">
    <thead class="bg-gray-50">
        <tr>
            {#each columns as column}
                <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                    {column.name}
                </th>
            {/each}
            {#if rowActions.length > 0}
                <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                    Actions
                </th>
            {/if}
        </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
        {#if rows}
            {#each rows as row}
                <tr>
                    {#each columns as column}
                        <td class="px-6 py-4 whitespace-nowrap">
                            <svelte:component
                                this={column.cellComponent}
                                rowNumber={row.i}
                                {column}
                                {row}
                            />
                        </td>
                    {/each}
                    {#if rowActions.length > 0}
                        <td>
                            {#each rowActions as a}
                                <span
                                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                                >
                                    <Link to={a.url + row.id}>{a.name}</Link>
                                </span>
                            {/each}
                        </td>
                    {/if}
                </tr>
            {/each}
        {/if}
    </tbody>
</table>

<style>
    table {
        width: 100%;
    }
    thead,
    tbody tr {
        display: table;
        width: 100%;
        table-layout: fixed;
    }
    tbody {
        display: block;
        overflow-y: auto;
        table-layout: fixed;
        max-height: 400px;
    }
</style>

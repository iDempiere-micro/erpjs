<script lang="ts">
    import type { Column, RowAction } from './types';

    export let columns: Column[] = [];
    export let rowActions: RowAction[] = [];
    export let rows: any[] | undefined = [];
    export let getRowKey: (row: any) => number = (x) => x.id;
    export let border: boolean | undefined = false;
    export let noScroll: boolean | undefined = false;
</script>

<table class="{border ? 'border' : ''} min-w-full divide-y divide-gray-200">
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
    <tbody
        class="bg-white divide-y divide-gray-200"
        style={!noScroll ? 'max-height: 400px; overflow-y: auto;' : ''}
    >
        {#if rows}
            {#each rows as row (getRowKey(row))}
                <tr>
                    {#each columns as column}
                        <td class="px-6 py-4 whitespace-nowrap">
                            <svelte:component
                                this={column.cellComponent}
                                rowNumber={getRowKey(row)}
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
                                    {#if a.url}
                                        <a href={`#/${a.url}${getRowKey(row)}`}>{a.name}</a>
                                    {:else}
                                        <button
                                            on:click|preventDefault={() => {
                                                if (a.onclick) a.onclick(row);
                                            }}>{a.name}</button
                                        >
                                    {/if}
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
        table-layout: fixed;
    }
</style>

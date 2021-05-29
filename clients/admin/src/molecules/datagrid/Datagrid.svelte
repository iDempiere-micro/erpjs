<script lang="ts">
    import type { Column, RowAction } from './types';
    import DataTable from '../../dsl/DataTable.svelte';

    export let columns: Column[] = [];
    export let rowActions: RowAction[] = [];
    export let rows: any[] | undefined = [];
    export let getRowKey: (row: any) => number = (x) => x.id;
    export let border: boolean | undefined = false;
    export let noScroll: boolean | undefined = false;
</script>

<DataTable data={rows} {columns} />

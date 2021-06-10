<script lang="ts">
    import DataGrid from '../../molecules/datagrid/Datagrid.svelte';
    import type { RowAction } from 'src/molecules/datagrid/types';
    import FirstColumn from './FirstColumn.svelte';
    import { _ } from 'svelte-i18n';
    import type { ProductRow } from '../../lib/model/product';

    export let products: ProductRow[] | undefined;

    const columns = [
        {
            name: $_('page.products.list.column1.title'),
            cellComponent: FirstColumn,
        },
    ];

    const rowActions: RowAction[] = [
        {
            name: $_('actions.edit'),
            url: 'product/',
        },
        {
            name: $_('actions.detail'),
            url: 'product-detail/',
        },
    ];
</script>

<DataGrid rows={products} {columns} {rowActions} />

<script lang="ts">
    import DataGrid from '../../molecules/datagrid/Datagrid.svelte';
    import type { RowAction } from 'src/molecules/datagrid/types';
    import FirstColumn from './FirstColumn.svelte';
    import type { ProductListPartsFragment } from '../../generated/graphql';

    export let products: ProductListPartsFragment[] | undefined;

    const columns = [
        {
            name: 'Bla',
            cellComponent: FirstColumn,
        },
    ];

    const rowActions: RowAction[] = [
        {
            name: 'edit',
            url: 'product/',
        },
        {
            name: 'detail',
            url: 'product-detail/',
        },
    ];
</script>

<DataGrid rows={products} {columns} {rowActions} />

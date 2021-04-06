<script lang="ts">
    import DataGrid from '../../molecules/datagrid/Datagrid.svelte';
    import type { RowAction } from 'src/molecules/datagrid/types';
    import FirstColumn from './FirstColumn.svelte';
    import type { CountryListPartsFragment } from '../../generated/graphql';

    export let countries: CountryListPartsFragment[] | undefined;

    const columns = [
        {
            name: 'Bla',
            cellComponent: FirstColumn,
        },
    ];

    const rowActions: RowAction[] = [
        {
            name: 'edit',
            url: 'country/',
        },
        {
            name: 'detail',
            url: 'country-detail/',
        },
    ];
</script>

<DataGrid rows={countries} {columns} {rowActions} />

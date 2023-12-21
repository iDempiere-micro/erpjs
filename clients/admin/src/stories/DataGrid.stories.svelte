<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import DataGrid from '../molecules/datagrid/Datagrid.svelte';
    import DataGridFirstColumn from './DataGridFirstColumn.svelte';
</script>

<Meta title="Molecules/DataGrid" component={DataGrid} argTypes={{}} />

<Template let:args>
    <DataGrid {...args} />
</Template>

<Story
    name="Primary"
    args={{
        columns: [
            {
                name: 'First column',
                cellComponent: DataGridFirstColumn,
            },
        ],
        rows: [{ firstLine: 'A', secondLine: 'B' }],
    }}
/>

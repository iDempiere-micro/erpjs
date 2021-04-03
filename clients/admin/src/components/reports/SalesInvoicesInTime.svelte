<script lang="ts">
    import { StackedAreaChart } from '@carbon/charts-svelte';
    import { apollo, setClient } from '../../lib/apollo';
    import { query } from 'svelte-apollo';
    import { getError } from '../../lib/util';
    import type { SalesInvoicesInTimeQuery } from '../../generated/graphql';
    import { QUERY } from '../../lib/queries/salesInvoicesInTime';
    import { _ } from 'svelte-i18n';

    const client = apollo('/');
    setClient(client);
    const data = query<SalesInvoicesInTimeQuery>(QUERY);
</script>

<svelte:head>
    <link rel="stylesheet" href="https://unpkg.com/@carbon/charts/styles.min.css" />
</svelte:head>

{#if $data.loading}
    {$_('status.loading')}
{:else if $data.error}
    Error:
    {getError($data.error)}
{:else}
    <StackedAreaChart
        data={$data.data?.salesInvoicesReport}
        options={{
            title: 'Sales Invoices Amount in Time',
            axes: {
                left: {
                    stacked: true,
                    scaleType: 'linear',
                    mapsTo: 'value',
                },
                bottom: {
                    scaleType: 'time',
                    mapsTo: 'date',
                },
            },
            curve: 'curveMonotoneX',
            height: '400px',
        }}
    />
{/if}

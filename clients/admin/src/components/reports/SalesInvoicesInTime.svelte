<script lang="ts">
    import { StackedAreaChart } from '@carbon/charts-svelte';

    import { getError } from '../../lib/support/util';
    import type { SalesInvoicesInTimeQuery } from '../../generated/graphql';
    import { QUERY } from '../../lib/queries/salesInvoicesInTime';
    import { _ } from 'svelte-i18n';
    import { ScaleTypes } from '@carbon/charts/interfaces';
    import { query } from '../../absorb/svelte-apollo';

    let data;
    setTimeout(() => {
        if ((window as any).token && !data) {
            data = query<SalesInvoicesInTimeQuery>(QUERY);
        }
    }, 1000);
</script>

<svelte:head>
    <link rel="stylesheet" href="https://unpkg.com/@carbon/charts/styles.min.css" />
</svelte:head>

{#if $data && $data.loading}
    {$_('status.loading')}
{:else if $data && $data.error}
    Error:
    {getError($data.error)}
{:else}
    <StackedAreaChart
        data={$data?.data?.salesInvoicesReport}
        options={{
            title: 'Sales Invoices Amount in Time',
            axes: {
                left: {
                    stacked: true,
                    scaleType: ScaleTypes.LINEAR,
                    mapsTo: 'value',
                },
                bottom: {
                    scaleType: ScaleTypes.TIME,
                    mapsTo: 'date',
                },
            },
            curve: 'curveMonotoneX',
            height: '400px',
        }}
    />
{/if}

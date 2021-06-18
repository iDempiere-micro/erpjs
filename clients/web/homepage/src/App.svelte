<script lang="ts">
    import { Column, Content, Grid, Row } from 'carbon-components-svelte';
    import Theme from './components/Theme.svelte';
    import SalesInvoicesInTime from './reports/SalesInvoicesInTime.svelte';
    import { MessageBus } from '@podium/browser';
    import { setupLocales } from './i18n';
    import {apollo, setClient, store} from "@eolerp/common";
    import {
        mock as mockSalesInvoicesInTime,
        QUERY as SALES_INVOICES_IN_TIME
    } from "./lib/queries/salesInvoicesInTime";
    import type {ApolloMockDef} from "../../support/common/src";

    let theme: 'g10' = 'g10';
    let ready = store(false);

    setupLocales();

    const messageBus = new MessageBus();
    messageBus.subscribe('tokens', 'newToken', (event) => {
        const token = event.payload as string;
        const url = import.meta.env.SNOWPACK_PUBLIC_API_BASE_URL!;
        const forceMock = import.meta.env.SNOWPACK_PUBLIC_MOCK;
        const mockDefs : ApolloMockDef[] = [
            { query: SALES_INVOICES_IN_TIME, mock: mockSalesInvoicesInTime }
        ]
        setClient(apollo({ token, url, forceMock, mockDefs }));
        ready.set(true);
    });
</script>

<Theme persist bind:theme>
    <Content id="content">
        <Grid>
            <Row>
                <Column noGutter>
                    {#if $ready}
                        <SalesInvoicesInTime />
                    {/if}
                </Column>
            </Row>
        </Grid>
    </Content>
</Theme>

<style>
    #content {
        background: none;
        padding: 1rem;
    }
</style>

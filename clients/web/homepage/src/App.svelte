<script lang="ts">
    import { Column, Content, Grid, Row } from 'carbon-components-svelte';
    import Theme from './components/Theme.svelte';
    import SalesInvoicesInTime from './reports/SalesInvoicesInTime.svelte';
    import { MessageBus } from '@podium/browser';
    import { setClient } from './absorb/svelte-apollo';
    import { apollo } from './lib/support/apollo';
    import { store } from './lib/support/store';
    import { setupLocales } from './i18n';

    let theme: 'g10' = 'g10';
    let ready = store(false);

    setupLocales();

    const messageBus = new MessageBus();
    messageBus.subscribe('tokens', 'newToken', (event) => {
        console.log('*** waaah?', event);

        const token = event.payload as string;
        setClient(apollo({ token }));
        ready.set(true);
    });
</script>

<Theme persist bind:theme>
    <Content style="background: none; padding: 1rem">
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

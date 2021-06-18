<script lang="ts">
    import { routes } from './routes';
    import Router from 'svelte-spa-router';
    import './main.css';
    import { setupLocales } from './i18n';
    import './smelte.copy.css';
    import { MessageBus } from '@podium/browser';
    import { apollo, ApolloMock, setClient } from '@eolerp/common';
    import { mocks as mockDefs } from './lib/support/mocks';

    const messageBus = new MessageBus();
    messageBus.subscribe('tokens', 'newToken', (event) => {
        const token = event.payload as string;
        const forceMock = process.env.MOCK === 'mock';
        const url = process.env.API_BASE_URL as string;
        setClient(apollo({ token, forceMock, url, mockDefs }));
    });

    export let url = '';

    setupLocales();
</script>

<Router {routes} />

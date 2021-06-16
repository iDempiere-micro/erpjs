<script lang="ts">
    import { routes } from './routes';
    import Router from 'svelte-spa-router';
    import './main.css';
    import { setupLocales } from './i18n';
    import { apollo, setClient } from './lib/support/apollo';
    import './smelte.copy.css';
    import { MessageBus } from '@podium/browser';

    const messageBus = new MessageBus();
    messageBus.subscribe('tokens', 'newToken', (event) => {
        const token = event.payload as string;
        setClient(apollo({ token }));
    });

    export let url = '';

    setupLocales();
</script>

<Router {routes} />

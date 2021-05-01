<script lang="ts">
    import { routes } from './routes';
    import Router from 'svelte-spa-router';
    import './main.css';
    import { setupLocales } from './i18n';
    import { authenticate } from './keycloak';
    import { apollo, setClient } from './lib/support/apollo';

    export let url = '';

    setupLocales();

    const client = apollo('/');
    setClient(client);

    $: {
        authenticate();
    }
</script>

<Router {routes} />

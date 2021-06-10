<script lang="ts">
    import { routes } from './routes';
    import Router from 'svelte-spa-router';
    import './main.css';
    import { setupLocales } from './i18n';
    import { authenticate } from './keycloak';
    import { apollo, setClient } from './lib/support/apollo';
    import './smelte.copy.css';

    export let url = '';

    setupLocales();

    $: {
        authenticate(() => {
            setClient(apollo());
        });
    }
</script>

<Router {routes} />

<script lang="ts">
    import { routes } from './routes';
    import Router from 'svelte-spa-router';
    import './main.css';
    import { setupLocales } from './i18n';
    import { apollo, setClient } from './lib/support/apollo';
    import './smelte.copy.css';

    export let url = '';

    setupLocales();

    $: {
      setClient(apollo());
    }
</script>

<Router {routes} />

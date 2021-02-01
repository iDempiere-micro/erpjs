<script lang="ts">
    import { Router, Link, Route } from 'svelte-routing';

    import Home from './routes/Home.svelte';
    import Customers from './routes/Customers.svelte';
    import AddCustomer from './routes/AddCustomer.svelte';
    import EditCustomer from './routes/EditCustomer.svelte';
    import CustomerDetail from './routes/CustomerDetail.svelte';
    import Nav from './Nav.svelte';
	import Page from './Page.svelte';
    import { authStore } from './lib/auth';
    import { navigate } from 'svelte-routing';
    import CustomerDetailPageHeader from './components/customer-detail/CustomerDetailPageHeader.svelte'

    export let url = '';

    const checkRedirect = () => {
        if (window.location.href.indexOf('/#nextUrl=') >= 0) {
            const redirectUri = window.location.href.split('/#nextUrl=')[1];
            navigate(redirectUri, { replace: true });
        }
    };

    $: {
        if (!$authStore?.token) {
            // @ts-ignore
            const keycloak = new Keycloak({
                url: process.env.KEYCLOAK_BASE_URL,
                realm: process.env.KEYCLOAK_REALM,
                clientId: 'erpjs',
                flow: 'implicit',
            });
            keycloak
                .init()
                .then(function (authenticated) {
                    console.log(authenticated ? 'authenticated' : 'not authenticated');
                    if (!authenticated) {
                        let redirectUri = process.env.URL;
                        if (window.location.href.indexOf('/#nextUrl=') >= 0) {
                            redirectUri = window.location.href;
                        }

                        keycloak.login({
                            redirectUri,
                        });
                    } else {
                        const { token } = keycloak;
                        $authStore = { token: token };

                        checkRedirect();
                    }
                })
                .catch(function (f) {
                    console.log('failed', f);
                });
        } else {
            checkRedirect();
        }
    }
</script>

<Router {url}>
    <div>
        <Nav />

		<Route path="/"><Home /></Route>
		<Route path="customers">
			<Page title="Customers">
				<span slot="content">
					<Customers  />
				</span>
			</Page>
		</Route>

		<Route path="add-customer" component={AddCustomer}/>

		<Route path="customer/:id" let:params>
			<EditCustomer id={params.id} />
		</Route>
		<Route path="customer-detail/:id" let:params>
			<Page>
				<span slot="content">
					<CustomerDetail id={params.id} />
				</span>
				<span slot="header">
					 <CustomerDetailPageHeader />
				</span>
			</Page>
		</Route>
    </div>
</Router>

<style global lang="postcss">
    /* only apply purgecss on utilities, per Tailwind docs */
    /* purgecss start ignore */
    @tailwind base;
    @tailwind components;
    /* purgecss end ignore */

    @tailwind utilities;
</style>

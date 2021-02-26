<script lang="ts">
    import { Router, Link, Route } from 'svelte-routing';

    import Home from './routes/Home.svelte';
    import Customers from './routes/Customers.svelte';
    import AddCustomer from './routes/AddCustomer.svelte';
    import EditCustomer from './routes/EditCustomer.svelte';
    import CustomerDetail from './routes/CustomerDetail.svelte';
    import Page from './Page.svelte';
    import { authStore } from './lib/auth';
    import { navigate } from 'svelte-routing';
    import CustomerDetailPageHeader from './components/customer-detail/CustomerDetailPageHeader.svelte';
    import SalesInvoices from './routes/SalesInvoices.svelte';

    export let url = '';

    import { addMessages, init, getLocaleFromNavigator } from 'svelte-i18n';

    import en from './locales/en.json';

    addMessages('en', en);

    init({
        fallbackLocale: 'en',
        initialLocale: getLocaleFromNavigator(),
    });

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
        <Route path="/">
            <Page title="Dashboard" segment="">
                <span slot="content">
                    <Home />
                </span>
            </Page>
        </Route>
        <Route path="customers">
            <Page title="Customers" segment="customers">
                <span slot="content">
                    <Customers />
                </span>
                <span slot="header">
                    <Link
                        to={`/add-customer`}
                        class="text-blue-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >Add Customer</Link
                    >
                </span>
            </Page>
        </Route>

        <Route path="add-customer">
            <Page title="Add Customer" segment="customers">
                <span slot="content">
                    <AddCustomer />
                </span>
            </Page>
        </Route>

        <Route path="customer/:id" let:params>
            <Page title="Edit Customer" segment="customers">
                <span slot="content">
                    <EditCustomer id={params.id} />
                </span>
            </Page>
        </Route>
        <Route path="customer-detail/:id" let:params>
            <Page segment="customers">
                <span slot="content">
                    <CustomerDetail id={params.id} />
                </span>
                <span slot="header">
                    <CustomerDetailPageHeader id={params.id} />
                </span>
            </Page>
        </Route>
        <Route path="sales-invoices">
            <Page title="Sales Invoices" segment="sales-invoices">
                <span slot="content">
                    <SalesInvoices />
                </span>
                <span slot="header">
                    <Link
                        to={`/create-sales-invoice`}
                        class="text-blue-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >Create Sales Invoice</Link
                    >
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

import Keycloak from 'keycloak-js';
import { replace } from 'svelte-spa-router';
import { authStore } from './lib/auth';

const checkRedirect = () => {
    if (window.location.href.indexOf('/#nextUrl=') >= 0) {
        const redirectUri = window.location.href.split('/#nextUrl=')[1];
        replace(redirectUri);
    }
};

export const authenticate = (): void => {
    if (!process.env.MOCK && !process.env.FAKE_TOKEN && !authStore?.get()?.token) {
        const keycloak = Keycloak({
            url: process.env.KEYCLOAK_BASE_URL,
            realm: process.env.KEYCLOAK_REALM || 'erpjs',
            clientId: 'erpjs',
            flow: 'implicit',
        } as any);
        keycloak
            .init({})
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
                    if (token) {
                        authStore.update((x) => ({ token: token }));

                        checkRedirect();
                    }
                }
            })
            .catch(function (f) {
                console.error('Keycloak login failed', f);
            });
    } else {
        checkRedirect();
    }
};

import Keycloak from 'keycloak-js';
import { logInternal } from './lib/support/util';

export const authenticate = (callback: () => void): void => {
    if (!process.env.MOCK && !process.env.FAKE_TOKEN && !(window as any).token) {
        const keycloak = Keycloak({
            url: process.env.KEYCLOAK_BASE_URL,
            realm: process.env.KEYCLOAK_REALM || 'erpjs',
            clientId: 'erpjs',
            flow: 'implicit',
        } as any);
        keycloak
            .init({})
            .then(function (authenticated) {
                logInternal(authenticated ? 'authenticated' : 'not authenticated');
                if (!authenticated) {
                    keycloak.login({
                        redirectUri: process.env.URL,
                    });
                } else {
                    const { token } = keycloak;
                    if (token) {
                        (window as any).token = token;
                        callback();
                    }
                }
            })
            .catch(function (f) {
                // eslint-disable-next-line no-console
                console.error('Keycloak login failed', f);
            });
    }
};

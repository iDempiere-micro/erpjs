import { TnsOaProvider } from 'nativescript-oauth2/providers';
import { KeycloakProvider, KeycloakProviderOptions } from '~/auth/keycloak.provider';
import { configureTnsOAuth } from 'nativescript-oauth2';

export function configureOAuthProviders() {
    const myCustomProvider = configureOAuthProviderMyCustomProvider();
    configureTnsOAuth([myCustomProvider]);
}
function configureOAuthProviderMyCustomProvider(): TnsOaProvider {
    const keycloakProviderOptions: KeycloakProviderOptions = {
        openIdSupport: "oid-none",
        clientId: "erpjs",
        redirectUri: "erpjs://erpjs",
        keycloakBaseUrl: process.env.KEYCLOAK_BASE_URL, 
        clientSecret: "ignore",
        realm: process.env.KEYCLOAK_REALM,
        scopes: ['openid', 'email', 'microprofile-jwt'],
    };
    return new KeycloakProvider(
        keycloakProviderOptions
    );
}

import { TnsOaProvider, TnsOaProviderType, TnsOaUnsafeProviderOptions } from 'nativescript-oauth2/providers';
import { ITnsOAuthTokenResult } from 'nativescript-oauth2';

export interface KeycloakProviderOptions extends TnsOaUnsafeProviderOptions {
    realm: string;
    keycloakBaseUrl: string;
}

export class KeycloakProvider implements TnsOaProvider {
    authority: string;
    authorizeEndpoint: string;
    cookieDomains: string[];
    providerType: TnsOaProviderType;
    tokenEndpoint: string;
    tokenEndpointBase: string;

    openIdSupport: string;

    constructor(public options: KeycloakProviderOptions) {
        const realm = options.realm;

        this.openIdSupport = "oid-none";
        this.providerType = "keycloak";
        this.authority = options.keycloakBaseUrl;
        this.tokenEndpointBase = options.keycloakBaseUrl;
        this.authorizeEndpoint = '/realms/'+realm+'/protocol/openid-connect/auth';
        this.tokenEndpoint = '/realms/'+realm+'/protocol/openid-connect/token';
        this.cookieDomains = [realm];
    }

    parseTokenResult(jsonData): ITnsOAuthTokenResult {
        return jsonData;
    }
}

import { Injectable } from '@angular/core';
import { Auth0 } from 'nativescript-auth0';
import { RouterExtensions } from 'nativescript-angular/router';

const appSettings = require('tns-core-modules/application-settings');

const SETTINGS_TOKEN_KEY = 'auth0accessToken';

@Injectable()
export class MobileAuthService {
  token?: string | null;
  private auth0 = new Auth0('0SNCzIORB4AU2PH9yrgL4EGruu0ZTEny', 'erpjs.eu.auth0.com');

  constructor(private routerExtensions: RouterExtensions,) {
  }

  async logout() {
    // assume the token is invalid
    appSettings.remove(SETTINGS_TOKEN_KEY);
    this.token = null;
  }

  async login() {
    const savedAccessToken = appSettings.getString(SETTINGS_TOKEN_KEY);
    if (savedAccessToken) {
      this.token = savedAccessToken;
    } else {
      const { accessToken } = await this.auth0.webAuthentication({
        audience: '@erpjs',
        scope: 'read:users update:users'
      });
      this.token = accessToken;
      appSettings.setString(SETTINGS_TOKEN_KEY, accessToken);
    }
    this.routerExtensions.navigate(['/checkServerConnection']);
  }

  isUserLoggedIn() {
    return !!this.token;
  }
}

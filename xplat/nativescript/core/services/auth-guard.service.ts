import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { RouterExtensions } from 'nativescript-angular/router';
import { MobileAuthService } from '@erp/nativescript/core/services/mobile.auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: MobileAuthService, private routerExtensions: RouterExtensions) { }

  canActivate() {
    if (this.authService.isUserLoggedIn()) {
      return true;
    } else {
      this.authService.login();

      return false;
    }
  }
}

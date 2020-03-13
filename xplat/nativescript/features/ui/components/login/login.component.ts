import { Component } from '@angular/core';

import { BaseComponent } from '@erp/core';
import { EventData } from 'tns-core-modules/data/observable';
import { RouterExtensions } from 'nativescript-angular/router';
import { MobileAuthService } from '@erp/nativescript/core/services/mobile.auth.service';

export let token : String = null;

@Component({
  moduleId: module.id,
  selector: 'xpl-login',
  templateUrl: './login.component.html'
})
export class LoginComponent extends BaseComponent {
  constructor(
    private routerExtensions: RouterExtensions,
    private authService: MobileAuthService,
  ) {
    super();
  }

  async onTap(args: EventData) {
    await this.authService.login();
  }
}

import { Component } from '@angular/core';

import { BaseComponent } from '@erp/core';

@Component({
  moduleId: module.id,
  selector: 'xpl-home',
  templateUrl: './home.component.html'
})
export class HomeComponent extends BaseComponent {
  constructor() {
    super();
  }
}

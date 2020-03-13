// libs
import { BaseComponent } from '@erp/core';
import { AppService } from '@erp/nativescript/core';

export abstract class AppBaseComponent extends BaseComponent {
  constructor(protected appService: AppService) {
    super();
  }
}

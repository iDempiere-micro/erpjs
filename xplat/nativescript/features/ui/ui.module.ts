import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { TNSFontIconModule } from 'nativescript-ngx-fonticon';
import { UISharedModule } from '@erp/features';
import { UI_COMPONENTS } from './components';

import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@erp/core';

const MODULES = [
  NativeScriptCommonModule,
  NativeScriptFormsModule,
  NativeScriptRouterModule,
  TNSFontIconModule,
  UISharedModule,
  NativeScriptModule,
  NativeScriptHttpClientModule,
  CoreModule,
];

@NgModule({
  imports: [...MODULES, CommonModule],
  declarations: [...UI_COMPONENTS],
  exports: [...MODULES, ...UI_COMPONENTS],
  schemas: [NO_ERRORS_SCHEMA]
})
export class UIModule {}

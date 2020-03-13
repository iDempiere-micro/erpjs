import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { UI_PIPES } from './pipes';

import { ApolloModule } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';

const MODULES = [
  TranslateModule,
  ApolloModule,
  HttpLinkModule,
];

@NgModule({
  imports: [...MODULES],
  declarations: [...UI_PIPES],
  exports: [...MODULES, ...UI_PIPES],
  providers: [],
})
export class UISharedModule {}

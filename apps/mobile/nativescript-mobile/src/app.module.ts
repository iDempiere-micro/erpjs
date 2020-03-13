// angular
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
// app
import { CoreModule } from './core/core.module';
import { SharedModule } from './features/shared/shared.module';
import { AppComponent } from './app.component';
import { UIModule } from '@erp/nativescript';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './interceptor.service';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { isAndroid } from 'tns-core-modules/platform';
import { _globalServerRootUri, apolloProvider } from '@erpjs/api-interfaces';

const uri =
  isAndroid ? 'http://10.0.2.2:3333' :
  'https://2zkxjfw2rh.execute-api.us-east-1.amazonaws.com/dev';

@NgModule({
  imports: [
    CoreModule,
    SharedModule,
    UIModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(routes),
    NativeScriptUISideDrawerModule,
    NativeScriptCommonModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    apolloProvider,
  ],
})
export class AppModule {
  constructor() {
    _globalServerRootUri.uri = uri;
  }
}

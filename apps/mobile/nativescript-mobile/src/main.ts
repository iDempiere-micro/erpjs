import { platformNativeScriptDynamic } from 'nativescript-angular/platform';
import { enableProdMode } from '@angular/core';
import { environment } from '@erp/core';
import { AppModule } from './app.module';

if (environment.production) {
  enableProdMode();
}

// if (!process.env.DEBUG_UI ) installAuth0Helper();

platformNativeScriptDynamic({createFrameOnBootstrap: true}).bootstrapModule(AppModule);

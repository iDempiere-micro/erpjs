import { AppService } from './app.service';
import { TNSWindowService } from './tns-window.service';
import { MobileAuthService } from '@erp/nativescript/core/services/mobile.auth.service';
import { AuthGuard } from '@erp/nativescript/core/services/auth-guard.service';

export const CORE_PROVIDERS: any[] = [AppService, TNSWindowService, MobileAuthService, AuthGuard];

export * from './app.service';
export * from './mobile.auth.service';
export * from './auth-guard.service';


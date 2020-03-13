import { CheckServerConnectionComponent, CustomerComponent, HomeComponent, LoginComponent, SalesInvoiceComponent } from '@erp/nativescript';
import { AuthGuard } from '@erp/nativescript/core/services/auth-guard.service';

export const routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'checkServerConnection', component: CheckServerConnectionComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'customer/:id', component: CustomerComponent },
  { path: 'salesInvoice/:id', component: SalesInvoiceComponent },
];

import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './ui/error/page-not-found.component';
import { HomepageComponent } from './ui/homepage/homepage.component';
import { CallbackComponent } from './ui/support/callback/callback.component';
import { AuthGuard } from './auth/auth.guard';
import { CustomersComponent } from './ui/list/customers/customers.component';
import { InvoicesComponent } from './ui/list/invoices/invoices.component';

export const appRoutes: Routes = [
  { path: 'callback', component: CallbackComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'invoices', component: InvoicesComponent },
  { path: '', component: HomepageComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }
];

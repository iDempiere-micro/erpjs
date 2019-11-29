import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './ui/error/page-not-found.component';
import { HomepageComponent } from './ui/homepage/homepage.component';
import { CallbackComponent } from './ui/support/callback/callback.component';
import { AuthGuard } from './auth/auth.guard';
import { CustomersComponent } from './ui/list/customers/customers.component';
import { InvoicesComponent } from './ui/list/invoices/invoices.component';
import { CustomerComponent } from './ui/detail/customer/customer.component';
import { UsersComponent } from './ui/list/users/users.component';
import { CalendarActivitiesComponent } from './ui/list/calendar.activities/calendar.activities.component';
import { TasksComponent } from './ui/list/tasks/tasks.component';
import { LeadsComponent } from './ui/list/leads/leads.component';
import { ProspectsComponent } from './ui/list/prospects/prospects.component';
import { ProspectComponent } from './ui/detail/prospect/prospect.component';
import { AccountsComponent } from './ui/list/accounts/accounts.component';
import { ProductsComponent } from './ui/list/products/products.component';
import { EditSalesInvoiceComponent } from './ui/edit/sales-invoice/edit.sales.invoice.component';
import { SalesInvoiceComponent } from './ui/detail/invoice/sales.invoice.component';

const everyRoute = '**';

export const appRoutes: Routes = [
  { path: 'callback', component: CallbackComponent }, // no guards on Auth0 callback
  { path: 'customers', component: CustomersComponent, runGuardsAndResolvers: 'always', canActivate: [AuthGuard] },
  { path: 'calendarActivities', component: CalendarActivitiesComponent, runGuardsAndResolvers: 'always', canActivate: [AuthGuard] },
  { path: 'tasks', component: TasksComponent, runGuardsAndResolvers: 'always', canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, runGuardsAndResolvers: 'always', canActivate: [AuthGuard] },
  { path: 'customer/:id', component: CustomerComponent, runGuardsAndResolvers: 'always', canActivate: [AuthGuard] },
  { path: 'salesInvoices', component: InvoicesComponent, runGuardsAndResolvers: 'always', canActivate: [AuthGuard] },
  { path: 'salesInvoice/:id', component: SalesInvoiceComponent, runGuardsAndResolvers: 'always', canActivate: [AuthGuard] },
  { path: 'editSalesInvoice/:id', component: EditSalesInvoiceComponent, runGuardsAndResolvers: 'always', canActivate: [AuthGuard] },
  { path: 'leads', component: LeadsComponent, runGuardsAndResolvers: 'always', canActivate: [AuthGuard] },
  { path: 'prospects', component: ProspectsComponent, runGuardsAndResolvers: 'always', canActivate: [AuthGuard] },
  { path: 'accounts', component: AccountsComponent, runGuardsAndResolvers: 'always', canActivate: [AuthGuard] },
  { path: 'products', component: ProductsComponent, runGuardsAndResolvers: 'always', canActivate: [AuthGuard] },
  { path: 'prospect/:id', component: ProspectComponent, runGuardsAndResolvers: 'always', canActivate: [AuthGuard] },
  { path: '', component: HomepageComponent, runGuardsAndResolvers: 'always', canActivate: [AuthGuard] },
  { path: everyRoute, component: PageNotFoundComponent }
];

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

export const appRoutes: Routes = [
  { path: 'callback', component: CallbackComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'calendarActivities', component: CalendarActivitiesComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'users', component: UsersComponent },
  { path: 'customer/:id', component: CustomerComponent },
  { path: 'invoices', component: InvoicesComponent },
  { path: '', component: HomepageComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }
];
